'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Package, Clock, LogOut } from 'lucide-react';

interface Order {
    _id: string;
    itemsPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    orderItems: {
        name: string;
        quantity: number;
        image: string;
        price: number;
    }[];
}

export default function ProfilePage() {
    const { user, token, logout } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full md:w-1/4">
                        <div className="bg-zinc-900 rounded-2xl p-6 border border-white/10 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{user.name}</h2>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium">
                                    <Package size={20} /> My Orders
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                                >
                                    <LogOut size={20} /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <h1 className="text-3xl font-bold mb-8">Order History</h1>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-40 bg-zinc-900 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20 bg-zinc-900 rounded-2xl border border-white/10">
                                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                                <p className="text-gray-400 mb-6">Looks like you haven't placed any orders yet.</p>
                                <button
                                    onClick={() => router.push('/shop')}
                                    className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
                                        <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4">
                                            <div>
                                                <p className="text-sm text-gray-400">Order ID</p>
                                                <p className="font-mono text-sm">#{order._id.slice(-8)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Date</p>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-gray-500" />
                                                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Total</p>
                                                <p className="font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {order.orderItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4">
                                                        <div className="w-16 h-16 bg-black rounded-lg overflow-hidden shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold">{item.name}</h4>
                                                            <p className="text-gray-400 text-sm">Qty: {item.quantity} × ${item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
