'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, MapPin, Check, Truck, Home } from 'lucide-react';

export default function OrderTrackingPage() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock Order Search
        setTimeout(() => {
            if (orderId === '12345') {
                setOrder({
                    id: '12345',
                    status: 'Shipped',
                    date: 'Feb 15, 2026',
                    items: [
                        { name: 'Wool Blend Coat', qty: 1, price: 299.99 },
                        { name: 'Classic Chinos', qty: 1, price: 79.99 }
                    ],
                    history: [
                        { status: 'Order Placed', date: 'Feb 15, 2026', time: '10:00 AM', done: true },
                        { status: 'Processing', date: 'Feb 16, 2026', time: '09:00 AM', done: true },
                        { status: 'Shipped', date: 'Feb 17, 2026', time: '02:00 PM', done: true },
                        { status: 'Out for Delivery', date: 'Feb 19, 2026', time: '08:00 AM', done: false },
                        { status: 'Delivered', date: 'Results Pending', time: '-', done: false },
                    ]
                });
            } else {
                setError('Order not found. Please check your details.');
                setOrder(null);
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-primary">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full px-4"
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Track Your Order</h1>
                    <p className="text-gray-500 font-light">
                        Enter your order ID and email to see the status of your shipment.
                    </p>
                </div>

                <div className="bg-cream p-8 rounded-sm shadow-xl border border-primary/10 mb-12">
                    <form onSubmit={handleTrack} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Order ID</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        className="w-full pl-12 pr-4 h-12 border-gray-300 focus:border-primary focus:ring-primary shadow-sm rounded-sm"
                                        placeholder="e.g. 12345"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Email Address</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 h-12 border-gray-300 focus:border-primary focus:ring-primary shadow-sm rounded-sm"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 font-bold hover:bg-secondary transition-colors shadow-md disabled:bg-gray-400"
                        >
                            {loading ? 'Tracking...' : 'Track Order'}
                        </button>
                        {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
                    </form>
                </div>

                <AnimatePresence>
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white border boundary border-gray-200 rounded-sm overflow-hidden shadow-sm"
                        >
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Order Status</p>
                                    <h2 className="text-2xl font-serif text-primary mt-1">{order.status}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium">{order.date}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="relative border-l-2 border-gray-200 ml-4 space-y-10 pl-8 pb-4">
                                    {order.history.map((step: any, idx: number) => (
                                        <div key={idx} className="relative">
                                            <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white ${step.done ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}>
                                                {step.done && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg ${step.done ? 'text-primary' : 'text-gray-400'}`}>{step.status}</h3>
                                                <p className="text-sm text-gray-500">{step.date} at {step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
