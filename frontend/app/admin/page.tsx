'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ShoppingBag,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    Activity,
    Clock,
    Filter,
    Download,
    ClipboardList,
    Settings
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/admin/dashboard');
                setDashboardData(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    const { stats: apiStats, recentOrders, categoryData, salesData } = dashboardData;

    const stats = [
        { title: 'Gross Revenue', value: `$${apiStats.revenue.toLocaleString()}`, change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-emerald-500' },
        { title: 'Total Orders', value: apiStats.totalOrders.toLocaleString(), change: '+3.2%', trend: 'up', icon: ShoppingBag, color: 'bg-blue-500' },
        { title: 'Active Customers', value: apiStats.activeCustomers.toLocaleString(), change: '+8%', trend: 'up', icon: Users, color: 'bg-purple-500' },
        { title: 'Conversion Rate', value: `${apiStats.conversionRate}%`, change: '+1.1%', trend: 'up', icon: Activity, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Page Title & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-primary font-bold">Dashboard</h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">Monitor your business health and sales performance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:shadow-md transition-all">
                        <Filter size={18} /> Filters
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-xl hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20">
                        <Download size={18} /> Export Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.03] rounded-bl-[100px] transition-all group-hover:scale-110`} />

                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 ${stat.color} rounded-2xl text-white shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                                    {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp className="rotate-180" size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.title}</h3>
                                <p className="text-3xl font-black text-primary mt-1 tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-serif text-primary font-bold">Revenue Trend</h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Revenue vs Orders</p>
                        </div>
                        <select className="bg-gray-50 border-none rounded-xl text-xs font-bold px-4 py-2 focus:ring-2 focus:ring-primary/5 cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2D2424" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2D2424" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#2D2424', borderRadius: '16px', border: 'none', color: '#FFF' }}
                                    itemStyle={{ color: '#E5D6C5' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#2D2424"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart / Categories */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary p-8 rounded-[40px] shadow-2xl text-white relative overflow-hidden"
                >
                    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

                    <h2 className="text-2xl font-serif font-bold mb-2">Category Split</h2>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Sales by department</p>

                    <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black">100%</span>
                            <span className="text-[10px] uppercase font-bold text-white/40">Market</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {categoryData.map((cat: any) => (
                            <div key={cat.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-sm font-bold text-white/80">{cat.name}</span>
                                </div>
                                <span className="text-sm font-black">{(cat.value / 10).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#FDFCFB]">
                        <div>
                            <h2 className="text-2xl font-serif text-primary font-bold">Recent Orders</h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Live Feed</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline underline-offset-4">View History</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentOrders.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 font-medium">No recent orders found.</div>
                        ) : (
                            recentOrders.map((order: any, idx: number) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-primary border border-gray-100">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{order.user}</p>
                                            <p className="text-xs text-gray-400 font-medium">Order {order.id} • {order.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-primary text-sm">{order.amount}</p>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'text-emerald-500' :
                                            order.status === 'Processing' ? 'text-blue-500' : 'text-orange-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-6">
                    <div className="bg-secondary p-8 rounded-[40px] text-primary relative overflow-hidden group border border-secondary/20">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black mb-2 uppercase tracking-tighter italic">Top Seller of the Week</h3>
                            <p className="text-primary/70 text-sm font-medium mb-6">"Classic Wool Blend Coat" has reached over 50 sales today.</p>
                            <button className="px-6 py-3 bg-primary text-white font-bold rounded-2xl text-xs hover:shadow-xl transition-all">Check Inventory</button>
                        </div>
                        <TrendingUp className="absolute bottom-[-10px] right-[-10px] w-32 h-32 text-primary/5 group-hover:scale-125 transition-transform duration-700" />
                    </div>

                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                        <h3 className="text-lg font-serif font-bold text-primary mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Add Product', icon: Package, href: '/admin/products/add' },
                                { label: 'All Orders', icon: ClipboardList, href: '/admin/orders' },
                                { label: 'Customers', icon: Users, href: '/admin/users' },
                                { label: 'Settings', icon: Settings, href: '/admin/settings' },
                            ].map((action) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 rounded-3xl hover:bg-primary hover:text-white transition-all group"
                                    >
                                        <Icon size={24} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
