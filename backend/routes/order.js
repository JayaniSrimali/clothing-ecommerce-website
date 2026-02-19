const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Get My Orders
router.get('/myorders', protect, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// Create Order (Simulated Payment or Direct Success for Demo)
router.post('/', protect, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: true, // For demo purposes, mark as paid
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// Update order to delivered (Admin)
router.put('/:id/deliver', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ msg: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
