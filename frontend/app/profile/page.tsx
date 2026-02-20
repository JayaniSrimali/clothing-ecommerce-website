'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
    Package, Clock, LogOut, User, MapPin,
    Settings, CreditCard, ChevronRight, Edit2, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [activeTab, setActiveTab] = useState('dashboard');
    const router = useRouter();

    // Mock Data for Demo
    const mockAddress = {
        street: "123 Fashion Ave",
        city: "Colombo",
        postalCode: "10100",
        country: "Sri Lanka"
    };

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                // Try fetching from API
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders, using mock data for demo", error);
                // Fallback Mock Orders
                setOrders([
                    {
                        _id: "ORD-29384",
                        itemsPrice: 4500,
                        totalPrice: 4800,
                        isPaid: true,
                        isDelivered: true,
                        createdAt: new Date().toISOString(),
                        orderItems: [
                            { name: "Silk Blouse", quantity: 1, price: 4500, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" }
                        ]
                    },
                    {
                        _id: "ORD-92837",
                        itemsPrice: 12000,
                        totalPrice: 12500,
                        isPaid: true,
                        isDelivered: false,
                        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                        orderItems: [
                            { name: "Leather Jacket", quantity: 1, price: 12000, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300" }
                        ]
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchOrders();
    }, [user, token, router]);

    if (!user) return null;

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Package },
        { id: 'orders', label: 'Orders', icon: Clock },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'account', label: 'Account Details', icon: User },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-gray-800 pt-28 pb-12 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Welcome */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-2">My Account</h1>
                    <p className="text-gray-500">Manage your profile, orders, and settings.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* SIDEBAR NAVIGATION */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                            {/* User User Profile Card */}
                            <div className="p-6 bg-[#3E2723] text-white flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-serif font-bold border-2 border-white/20">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-1.5 bg-[#F5C255] rounded-full text-[#3E2723] hover:scale-110 transition-transform">
                                        <Camera className="w-3 h-3" />
                                    </button>
                                </div>
                                <h2 className="text-lg font-bold">{user.name}</h2>
                                <p className="text-white/60 text-xs">{user.email}</p>
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-2 space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === tab.id
                                                ? 'bg-[#3E2723]/5 text-[#3E2723] font-bold'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#3E2723]' : 'text-gray-400'}`} />
                                            {tab.label}
                                        </div>
                                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-[#3E2723]" />}
                                    </button>
                                ))}
                                <div className="h-px bg-gray-100 my-2" />
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium text-sm transition-colors"
                                >
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* DASHBOARD TAB */}
                                {activeTab === 'dashboard' && (
                                    <div className="space-y-8">
                                        <div className="bg-[#3E2723]/5 p-6 rounded-xl border border-[#3E2723]/10">
                                            <h3 className="text-xl font-serif font-bold text-[#3E2723] mb-2">Hello, {user.name}!</h3>
                                            <p className="text-gray-600 text-sm">
                                                From your account dashboard you can view your <span className="font-bold text-[#3E2723] cursor-pointer" onClick={() => setActiveTab('orders')}>recent orders</span>,
                                                manage your <span className="font-bold text-[#3E2723] cursor-pointer" onClick={() => setActiveTab('addresses')}>shipping and billing addresses</span>,
                                                and <span className="font-bold text-[#3E2723] cursor-pointer" onClick={() => setActiveTab('account')}>edit your password and account details</span>.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('orders')}>
                                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                                    <Package className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-bold text-gray-900">Total Orders</h4>
                                                <p className="text-2xl font-bold text-[#3E2723]">{orders.length}</p>
                                            </div>
                                            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-bold text-gray-900">Pending Orders</h4>
                                                <p className="text-2xl font-bold text-[#3E2723]">{orders.filter(o => !o.isDelivered).length}</p>
                                            </div>
                                            <div className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-bold text-gray-900">Total Spent</h4>
                                                <p className="text-2xl font-bold text-[#3E2723]">Rs. {orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ORDERS TAB */}
                                {activeTab === 'orders' && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-serif font-bold text-[#3E2723] border-b border-gray-100 pb-4">Order History</h3>

                                        {orders.length === 0 ? (
                                            <div className="text-center py-12">
                                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">No orders placed yet.</p>
                                                <button onClick={() => router.push('/shop')} className="mt-4 text-[#3E2723] font-bold underline">Start Shopping</button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {orders.map((order) => (
                                                    <div key={order._id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#3E2723]/30 transition-colors">
                                                        <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center text-sm gap-4">
                                                            <div className="flex gap-6">
                                                                <div>
                                                                    <span className="block text-gray-400 text-xs uppercase tracking-wider">Order ID</span>
                                                                    <span className="font-bold text-gray-900">#{order._id.slice(-6)}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="block text-gray-400 text-xs uppercase tracking-wider">Date</span>
                                                                    <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="block text-gray-400 text-xs uppercase tracking-wider">Total</span>
                                                                    <span className="font-bold text-[#3E2723]">Rs. {order.totalPrice.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : 'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-4 bg-white">
                                                            {order.orderItems.map((item, idx) => (
                                                                <div key={idx} className="flex items-center gap-4 py-2 first:pt-0 last:pb-0">
                                                                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200">
                                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                                                                        <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-bold text-sm text-[#3E2723]">Rs. {item.price.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ADDRESSES TAB */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                            <h3 className="text-2xl font-serif font-bold text-[#3E2723]">My Addresses</h3>
                                            <button className="text-sm font-bold text-[#3E2723] hover:underline flex items-center gap-1">
                                                <Settings className="w-4 h-4" /> Manage
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 border border-[#3E2723]/20 rounded-xl bg-[#3E2723]/5 relative group cursor-pointer hover:shadow-md transition-all">
                                                <div className="absolute top-4 right-4 bg-[#3E2723] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Default</div>
                                                <h4 className="font-bold text-gray-900 mb-2">Billing Address</h4>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                    {user.name}<br />
                                                    {mockAddress.street}<br />
                                                    {mockAddress.city}, {mockAddress.postalCode}<br />
                                                    {mockAddress.country}
                                                </p>
                                                <button className="text-xs font-bold text-[#3E2723] uppercase tracking-wider hover:underline">Edit Address</button>
                                            </div>

                                            <div className="p-6 border border-gray-200 rounded-xl border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors h-full min-h-[180px]">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                                    <Settings className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-sm">Add New Address</h4>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ACCOUNT DETAILS TAB */}
                                {activeTab === 'account' && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-serif font-bold text-[#3E2723] border-b border-gray-100 pb-4">Account Details</h3>

                                        <form className="space-y-6 max-w-lg">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                                                    <input type="text" defaultValue={user.name.split(' ')[0]} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none text-sm" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                                                    <input type="text" defaultValue={user.name.split(' ')[1] || ''} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none text-sm" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                                <input type="email" defaultValue={user.email} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none text-sm" />
                                            </div>

                                            <div className="space-y-4 pt-4">
                                                <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Password Change</h4>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Password</label>
                                                    <input type="password" placeholder="Leave blank to keep current password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none text-sm" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
                                                    <input type="password" placeholder="New Password" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none text-sm" />
                                                </div>
                                            </div>

                                            <button className="px-8 py-3 bg-[#3E2723] text-white font-bold rounded-lg hover:bg-[#2D1B18] transition-all shadow-md active:transform active:scale-95">
                                                Save Changes
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
