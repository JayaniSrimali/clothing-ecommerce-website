const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get combined dashboard data
router.get('/dashboard', async (req, res) => {
    try {
        // 1. Stats
        const totalOrders = await Order.countDocuments();

        const completedOrders = await Order.find({ isPaid: true });
        const revenue = completedOrders.reduce((acc, order) => acc + order.totalPrice, 0);

        const activeCustomers = await User.countDocuments();

        // Mocking conversion rate for now, or calculating it if we had visitors
        const conversionRate = totalOrders > 0 ? ((totalOrders / (activeCustomers * 5)) * 100).toFixed(2) : '0.00';

        // 2. Recent Orders
        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(4)
            .populate('user', 'name');

        // Formatted recent orders for frontend
        const formattedRecentOrders = recentOrders.map(order => ({
            id: `#${order._id.toString().substring(18).toUpperCase()}`,
            user: order.user ? order.user.name : 'Guest User',
            amount: `$${order.totalPrice.toFixed(2)}`,
            status: order.isDelivered ? 'Delivered' : (order.isPaid ? 'Processing' : 'Pending'),
            time: new Date(order.createdAt).toLocaleDateString()
        }));

        // 3. Category Data (Products grouped by Category)
        const products = await Product.find({});
        const categoryMap = {};

        products.forEach(p => {
            if (!categoryMap[p.category]) {
                categoryMap[p.category] = { count: 0, revenue: 0 };
            }
            categoryMap[p.category].count += 1;
        });

        const categoryColors = {
            'Men': '#2D2424',
            'Women': '#B2A08B',
            'Kids': '#E5D6C5',
            'Accessories': '#5B4B49',
            'electronics': '#2D2424',
            'clothing': '#B2A08B'
        };

        const categoryData = Object.keys(categoryMap).map((key, index) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: categoryMap[key].count * 100, // scaled for chart visibility
            color: categoryColors[key] || categoryColors[Object.keys(categoryColors)[index % 4]]
        }));

        // If no products, return some defaults to avoid blank chart
        if (categoryData.length === 0) {
            categoryData.push(
                { name: 'Men', value: 400, color: '#2D2424' },
                { name: 'Women', value: 300, color: '#B2A08B' },
                { name: 'Kids', value: 200, color: '#E5D6C5' },
                { name: 'Accessories', value: 100, color: '#5B4B49' }
            );
        }

        // 4. Sales Data (Last 7 Days)
        // Group orders by day
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const recentPaidOrders = await Order.find({
            isPaid: true,
            createdAt: { $gte: last7Days }
        });

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const salesDataMap = {};

        // Initialize last 7 days map
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            salesDataMap[days[d.getDay()]] = { sales: 0, orders: 0 };
        }

        recentPaidOrders.forEach(order => {
            const dayName = days[new Date(order.createdAt).getDay()];
            if (salesDataMap[dayName]) {
                salesDataMap[dayName].sales += order.totalPrice;
                salesDataMap[dayName].orders += 1;
            }
        });

        const salesData = Object.keys(salesDataMap).map(key => ({
            name: key,
            sales: salesDataMap[key].sales,
            orders: salesDataMap[key].orders
        }));

        res.json({
            stats: {
                revenue,
                totalOrders,
                activeCustomers,
                conversionRate
            },
            recentOrders: formattedRecentOrders,
            categoryData,
            salesData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error fetching dashboard data' });
    }
});

module.exports = router;
