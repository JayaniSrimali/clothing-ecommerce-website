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
    const { user, token, logout, login } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        setName(user.name);
        setEmail(user.email);

        const fetchOrders = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders, using mock data for demo", error);
                // Fallback Mock Orders for visual consistency if backend fails
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
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchOrders();
    }, [user, token, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            import('react-hot-toast').then(t => t.default.error('Passwords do not match!'));
            return;
        }

        setIsUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put('http://localhost:5000/api/users/profile', {
                name,
                email,
                password
            }, config);

            // Update local storage and context
            login(data.token, { id: data.id, name: data.name, email: data.email });

            import('react-hot-toast').then(t => t.default.success('Profile updated successfully!'));
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            const message = error.response?.data?.msg || 'Error updating profile';
            import('react-hot-toast').then(t => t.default.error(message));
        } finally {
            setIsUpdating(false);
        }
    };

    const mockAddress = {
        street: "123 Fashion Ave",
        city: "Colombo",
        postalCode: "10100",
        country: "Sri Lanka"
    };

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
                    <h1 className="text-3xl md:text-4xl font-outfit font-black text-primary mb-2 uppercase tracking-tight">My Account</h1>
                    <p className="text-gray-500 font-outfit uppercase tracking-widest text-[10px]">Manage your profile, orders, and settings.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* SIDEBAR NAVIGATION */}
                    <aside className="w-full lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-28 border border-primary/5">
                            {/* User Profile Card */}
                            <div className="p-8 bg-primary text-white flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-4xl font-outfit font-black border-4 border-white/20 shadow-inner uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <button className="absolute bottom-1 right-1 p-2 bg-secondary rounded-full text-white hover:scale-110 transition-transform shadow-lg border-2 border-primary">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold font-outfit tracking-tight">{user.name}</h2>
                                <p className="text-white/60 text-xs font-medium">{user.email}</p>
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-4 space-y-1 bg-white">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all font-outfit uppercase tracking-widest text-[10px] font-black ${activeTab === tab.id
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'text-primary/40 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-primary/30'}`} />
                                            {tab.label}
                                        </div>
                                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-white" />}
                                    </button>
                                ))}
                                <div className="h-px bg-primary/5 my-4" />
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-500 hover:bg-red-50 font-outfit uppercase tracking-widest text-[10px] font-black transition-colors"
                                >
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <main className="flex-1 bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[600px] border border-primary/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* DASHBOARD TAB */}
                                {activeTab === 'dashboard' && (
                                    <div className="space-y-12">
                                        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                                <Package className="w-48 h-48" />
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="text-3xl font-outfit font-black mb-4 uppercase tracking-tighter">Welcome back, {user.name.split(' ')[0]}!</h3>
                                                <p className="text-white/80 text-sm font-medium max-w-lg leading-relaxed">
                                                    Your personal oasis of style awaits. Track your latest orders, manage your sanctuary (addresses), and refine your identity.
                                                </p>
                                                <div className="mt-8 flex gap-4">
                                                    <button onClick={() => setActiveTab('orders')} className="bg-white text-primary px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-secondary transition-colors">Recent Orders</button>
                                                    <button onClick={() => setActiveTab('account')} className="bg-transparent border border-white/30 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">Edit Profile</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <motion.div whileHover={{ y: -5 }} className="group p-8 border border-primary/5 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => setActiveTab('orders')}>
                                                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Package className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-outfit uppercase tracking-[0.15em] text-[10px] font-black text-primary/40 mb-1">Total History</h4>
                                                <p className="text-4xl font-outfit font-black text-primary">{orders.length}</p>
                                            </motion.div>

                                            <motion.div whileHover={{ y: -5 }} className="group p-8 border border-primary/5 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
                                                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-outfit uppercase tracking-[0.15em] text-[10px] font-black text-primary/40 mb-1">In Processing</h4>
                                                <p className="text-4xl font-outfit font-black text-primary">{orders.filter(o => !o.isDelivered).length}</p>
                                            </motion.div>

                                            <motion.div whileHover={{ y: -5 }} className="group p-8 border border-primary/5 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer">
                                                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <h4 className="font-outfit uppercase tracking-[0.15em] text-[10px] font-black text-primary/40 mb-1">Lifetime Value</h4>
                                                <p className="text-3xl font-outfit font-black text-primary">Rs. {orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {/* ORDERS TAB */}
                                {activeTab === 'orders' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between mb-8 border-b border-primary/5 pb-6">
                                            <h3 className="text-3xl font-outfit font-black text-primary uppercase tracking-tighter">Order History</h3>
                                            <div className="px-4 py-1.5 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary">{orders.length} total</div>
                                        </div>

                                        {loading ? (
                                            <div className="flex flex-col items-center justify-center py-20 text-primary/20">
                                                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Architecting your history...</p>
                                            </div>
                                        ) : orders.length === 0 ? (
                                            <div className="text-center py-24 bg-primary/5 rounded-3xl border border-dashed border-primary/20">
                                                <Package className="w-20 h-20 text-primary/10 mx-auto mb-6" />
                                                <p className="text-primary/40 font-outfit uppercase tracking-[0.2em] text-[10px] font-black mb-8">No collections yet</p>
                                                <button onClick={() => router.push('/shop')} className="bg-primary text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-secondary transition-all shadow-xl">Curate Now</button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {orders.map((order) => (
                                                    <motion.div
                                                        key={order._id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="group bg-white rounded-3xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500"
                                                    >
                                                        <div className="bg-primary/2 text-primary p-6 md:px-8 border-b border-primary/5 flex flex-wrap justify-between items-center gap-6">
                                                            <div className="flex gap-10">
                                                                <div>
                                                                    <span className="block text-primary/30 text-[9px] font-black uppercase tracking-widest mb-1">Identity</span>
                                                                    <span className="font-outfit font-black text-sm uppercase">#{order._id.slice(-8)}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="block text-primary/30 text-[9px] font-black uppercase tracking-widest mb-1">Moment</span>
                                                                    <span className="font-outfit font-black text-sm uppercase">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="block text-primary/30 text-[9px] font-black uppercase tracking-widest mb-1">Value</span>
                                                                    <span className="font-outfit font-black text-sm text-secondary">Rs. {order.totalPrice.toLocaleString()}</span>
                                                                </div>
                                                            </div>
                                                            <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${order.isDelivered
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-primary text-white'
                                                                }`}>
                                                                {order.isDelivered ? 'Delivered' : 'En Route'}
                                                            </div>
                                                        </div>
                                                        <div className="p-8">
                                                            {order.orderItems.map((item, idx) => (
                                                                <div key={idx} className="flex items-center gap-6 py-4 first:pt-0 last:pb-0 border-b border-primary/5 last:border-0">
                                                                    <div className="w-20 h-24 bg-primary/2 rounded-2xl overflow-hidden shrink-0 border border-primary/5 group-hover:shadow-lg transition-all duration-500">
                                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-outfit font-black text-primary text-sm uppercase tracking-tight mb-1">{item.name}</h4>
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="text-primary/30 text-[10px] font-black uppercase">Qty: {item.quantity}</span>
                                                                            <span className="w-1 h-1 bg-primary/20 rounded-full" />
                                                                            <span className="text-secondary font-black text-[10px] uppercase">Unit: Rs. {item.price.toLocaleString()}</span>
                                                                        </div>
                                                                    </div>
                                                                    <button className="hidden md:block px-6 py-2 border border-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary/40 hover:bg-primary hover:text-white hover:border-primary transition-all">Support</button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* ADDRESSES TAB */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-10">
                                        <div className="flex justify-between items-center border-b border-primary/5 pb-8 mb-4">
                                            <h3 className="text-3xl font-outfit font-black text-primary uppercase tracking-tighter">Sanctuary</h3>
                                            <button className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-all">Add New Address</button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <motion.div whileHover={{ y: -5 }} className="group p-8 border-2 border-primary rounded-3xl bg-white shadow-2xl relative transition-all">
                                                <div className="absolute -top-3 left-8 bg-primary text-white text-[8px] uppercase font-black px-4 py-1 rounded-full shadow-lg tracking-[0.2em]">Primary Sanctuary</div>
                                                <h4 className="font-outfit font-black text-primary text-lg uppercase tracking-tight mb-4">Billing & Shipping</h4>
                                                <div className="space-y-2 mb-8">
                                                    <p className="text-primary/80 text-[13px] font-medium leading-relaxed bg-primary/2 p-4 rounded-2xl border border-primary/5">
                                                        <span className="block font-black text-primary mb-1 uppercase tracking-widest text-[10px]">{user.name}</span>
                                                        {mockAddress.street}<br />
                                                        {mockAddress.city}, {mockAddress.postalCode}<br />
                                                        {mockAddress.country}
                                                    </p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button className="flex-1 py-3 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-secondary transition-all shadow-xl">Edit</button>
                                                    <button className="p-3 border border-primary/10 text-primary/30 rounded-2xl hover:text-red-500 hover:border-red-100 transition-all"><Settings className="w-5 h-5" /></button>
                                                </div>
                                            </motion.div>

                                            <div className="p-10 border-2 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-primary/2 hover:border-primary/20 transition-all cursor-pointer h-full min-h-[280px]">
                                                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                    <MapPin className="w-6 h-6 text-primary/30" />
                                                </div>
                                                <h4 className="font-outfit font-black text-primary/30 text-xs uppercase tracking-[0.2em]">Establish New Location</h4>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ACCOUNT DETAILS TAB */}
                                {activeTab === 'account' && (
                                    <div className="space-y-12">
                                        <div className="border-b border-primary/5 pb-8 mb-4">
                                            <h3 className="text-3xl font-outfit font-black text-primary uppercase tracking-tighter">Identify</h3>
                                            <p className="text-primary/40 text-[10px] font-black uppercase tracking-[0.2em]">Refine your digital persona</p>
                                        </div>

                                        <form onSubmit={handleUpdateProfile} className="space-y-10 max-w-2xl">
                                            <div className="bg-primary/2 p-8 md:p-10 rounded-[40px] border border-primary/5 space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">Name Token</label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="w-full h-14 bg-white border border-primary/5 px-6 rounded-2xl focus:border-secondary outline-none text-sm font-bold text-primary shadow-sm transition-all focus:shadow-xl"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">Digital Mail</label>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full h-14 bg-white border border-primary/5 px-6 rounded-2xl focus:border-secondary outline-none text-sm font-bold text-primary shadow-sm transition-all focus:shadow-xl"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-8 md:p-10 rounded-[40px] border border-primary/10 space-y-8 shadow-xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                                                        <Edit2 className="w-4 h-4 text-secondary" />
                                                    </div>
                                                    <h4 className="font-outfit font-black text-primary text-sm uppercase tracking-[0.15em]">Security Protocol</h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">New Access Key</label>
                                                        <input
                                                            type="password"
                                                            placeholder="Leave empty to persist"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="w-full h-14 bg-primary/2 border border-primary/5 px-6 rounded-2xl focus:border-secondary outline-none text-sm font-bold text-primary transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] ml-2">Confirm Key</label>
                                                        <input
                                                            type="password"
                                                            placeholder="Repeat access key"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full h-14 bg-primary/2 border border-primary/5 px-6 rounded-2xl focus:border-secondary outline-none text-sm font-bold text-primary transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                disabled={isUpdating}
                                                className={`group relative w-full md:w-auto px-16 h-16 bg-primary text-white rounded-3xl overflow-hidden shadow-2xl transition-all disabled:opacity-50 active:scale-95`}
                                            >
                                                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                                                    {isUpdating ? (
                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    ) : 'Establish Updates'}
                                                </span>
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
