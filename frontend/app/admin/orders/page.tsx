'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
    Truck,
    CheckCircle2,
    Eye,
    Clock,
    Search,
    Filter,
    CreditCard,
    MapPin,
    User,
    Calendar,
    ChevronDown,
    MoreVertical,
    FileText,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
    _id: string;
    user: { name: string; email: string };
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    paymentMethod: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/orders');
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const markAsDelivered = async (id: string) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${id}/deliver`);
            fetchOrders();
        } catch (err) {
            alert('Status update failed');
        }
    };

    const filteredOrders = orders.filter(o => {
        if (filter === 'pending') return !o.isDelivered;
        if (filter === 'delivered') return o.isDelivered;
        return true;
    });

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-primary font-bold">Order Management</h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">Track fulfillment, payments, and delivery statuses.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:shadow-md transition-all">
                        <Download size={18} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Pending Fulfillment', count: orders.filter(o => !o.isDelivered).length, color: 'bg-orange-500', icon: Clock },
                    { label: 'Out for Delivery', count: orders.filter(o => o.isPaid && !o.isDelivered).length, color: 'bg-blue-500', icon: Truck },
                    { label: 'Successfully Delivered', count: orders.filter(o => o.isDelivered).length, color: 'bg-emerald-500', icon: CheckCircle2 },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group overflow-hidden relative"
                    >
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stat.color}`} />
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-black text-primary mt-1">{stat.count}</p>
                        </div>
                        <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                            <stat.icon size={24} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                {['all', 'pending', 'processing', 'delivered'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white text-gray-400 hover:text-primary border border-gray-50'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Orders Table UI */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FDFCFB] border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Transaction Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Method</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Amount</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {loading ? (
                                    <tr><td colSpan={6} className="px-8 py-20 text-center"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" /><p className="mt-4 text-gray-400 text-sm font-medium">Fetching orders...</p></td></tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-medium">No orders matching your criteria.</td></tr>
                                ) : (
                                    filteredOrders.map((order, idx) => (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-[#FDFCFB] group transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary border border-gray-100">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-serif font-black text-primary text-sm">#{order._id.substring(18).toUpperCase()}</p>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mt-0.5">
                                                            <Calendar size={12} />
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                                                        {(order.user?.name || 'G').charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-primary">{order.user?.name || 'Guest User'}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{order.user?.email || 'guest@example.com'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.isPaid ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${order.isPaid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                                    </div>
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${order.isDelivered ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${order.isDelivered ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                                                        {order.isDelivered ? 'Delivered' : 'Pending'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <CreditCard size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{order.paymentMethod || 'Stripe'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-lg font-black text-primary tracking-tight">${order.totalPrice.toFixed(2)}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {!order.isDelivered && (
                                                        <button
                                                            onClick={() => markAsDelivered(order._id)}
                                                            className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:bg-black transition-all"
                                                        >
                                                            Deliver
                                                        </button>
                                                    )}
                                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary shadow-sm hover:shadow-md transition-all">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary shadow-sm hover:shadow-md transition-all">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Fulfillment Guide */}
            <div className="bg-primary p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-3xl font-serif font-black mb-4 italic">Next Generation Fulfillment</h2>
                        <p className="text-white/60 font-medium leading-relaxed">Boost your efficiency with automated shipping labels and live carrier tracking integrations. Aura Logistics API is now available for all business tiers.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-10 py-5 bg-secondary text-primary font-black rounded-3xl hover:bg-white transition-all shadow-xl shadow-black/20">Enable Auto-Ship</button>
                        <button className="px-10 py-5 bg-white/10 text-white font-black rounded-3xl hover:bg-white/20 transition-all border border-white/10">Documentation</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
