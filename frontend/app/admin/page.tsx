'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';

const stats = [
    { title: 'Total Revenue', value: '$24,560', change: '+12%', trend: 'up', icon: DollarSign },
    { title: 'Total Orders', value: '345', change: '-5%', trend: 'down', icon: ShoppingBag },
    { title: 'Active Users', value: '1,203', change: '+8%', trend: 'up', icon: Users },
    { title: 'Products', value: '86', change: '+2%', trend: 'up', icon: Package },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
                <div className="flex gap-4">
                    <select className="px-4 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm hover:border-gray-300">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last Year</option>
                    </select>
                    <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 shadow-sm transition-colors">
                        Export Report
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="p-3 bg-primary/5 rounded-lg text-primary">
                                    <Icon className="w-6 h-6" />
                                </span>
                                <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 bg-green-50 px-2 py-1 rounded-full' : 'text-red-600 bg-red-50 px-2 py-1 rounded-full'}`}>
                                    {stat.change}
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Orders Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: '#ORD-00123', user: 'Sarah Doe', status: 'Processing', amount: '$120.00', date: 'Oct 24, 2026' },
                                { id: '#ORD-00122', user: 'James Smith', status: 'Shipped', amount: '$85.50', date: 'Oct 23, 2026' },
                                { id: '#ORD-00121', user: 'Emily White', status: 'Delivered', amount: '$240.00', date: 'Oct 22, 2026' },
                                { id: '#ORD-00120', user: 'Michael Brown', status: 'Pending', amount: '$45.00', date: 'Oct 21, 2026' },
                                { id: '#ORD-00119', user: 'Lisa Green', status: 'Cancelled', amount: '$150.00', date: 'Oct 20, 2026' },
                            ].map((order, idx) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4">{order.user}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                    order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                                        order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                                                            'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{order.amount}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
