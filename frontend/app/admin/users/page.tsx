'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
    Trash2,
    Mail,
    Shield,
    User as UserIcon,
    Search,
    Filter,
    MoreHorizontal,
    ChevronRight,
    ArrowUpRight,
    MapPin,
    Calendar,
    UserCheck,
    UserMinus,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const deleteUser = async (id: string) => {
        if (confirm('Are you sure you want to ban/delete this user? All associated data will be archived.')) {
            try {
                // The original axios.delete call is removed as per the instruction's snippet.
                // A new nested confirm is introduced, and a mock deletion with toast.success.
                if (confirm('Are you sure you want to delete this user?')) {
                    setUsers(users.filter(u => u._id !== id)); // Corrected u.id to u._id based on User interface
                    toast.success('User deleted (Mock)');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Action failed');
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-primary font-bold">User Directory</h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">Manage platform access, roles, and security permissions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:shadow-md transition-all">
                        <Download size={18} /> Export List
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-xl transition-all shadow-lg shadow-primary/20">
                        Invite Manager
                    </button>
                </div>
            </div>

            {/* User Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Accounts', value: users.length, icon: UserIcon, color: 'text-primary' },
                    { label: 'Active Admins', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-purple-500' },
                    { label: 'New This Month', value: '+124', icon: ArrowUpRight, color: 'text-emerald-500' },
                    { label: 'Retention Rate', value: '88%', icon: UserCheck, color: 'text-blue-500' },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
                    >
                        <div className={`p-4 bg-gray-50 rounded-2xl ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-none mb-1.5">{stat.label}</p>
                            <p className="text-2xl font-black text-primary tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Table & Controls */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Find collaborator..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/5 transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all">
                            Roles <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FDFCFB] border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contributor Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Position & Permission</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Activity Level</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Joined</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {loading ? (
                                    <tr><td colSpan={5} className="px-8 py-20 text-center"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" /></td></tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium font-serif italic text-lg">No matches in current workspace directory.</td></tr>
                                ) : (
                                    filteredUsers.map((user, idx) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-[#FDFCFB] group transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-primary text-secondary flex items-center justify-center font-black text-xl shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-serif font-black text-primary text-lg leading-none">{user.name}</p>
                                                        <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                                                            <Mail size={12} />
                                                            <p className="text-xs font-bold lowercase tracking-tight">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-xl border ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                        {user.role === 'admin' ? <Shield size={14} /> : <UserIcon size={14} />}
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'text-purple-500' : 'text-blue-500'}`}>
                                                        {user.role === 'admin' ? 'System Admin' : 'Customer'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                        <span className="text-gray-400">Platform Engagement</span>
                                                        <span className="text-primary">{Math.floor(Math.random() * 60 + 40)}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.floor(Math.random() * 60 + 40)}%` }}
                                                            className="h-full bg-primary rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Calendar size={14} />
                                                    <span className="text-xs font-bold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Jan 2024'}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary shadow-sm transition-all transition-transform hover:scale-110">
                                                        <Mail size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(user._id)}
                                                        className="p-3 bg-white border border-gray-100 rounded-xl text-red-400 hover:text-red-600 shadow-sm transition-all transition-transform hover:scale-110 hover:bg-red-50"
                                                        title="Revoke Access"
                                                    >
                                                        <UserMinus size={18} />
                                                    </button>
                                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary shadow-sm">
                                                        <MoreHorizontal size={18} />
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

            {/* Newsletter Segment Insight */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#2D2424] p-10 rounded-[40px] text-white overflow-hidden relative group">
                    <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-secondary/10 rounded-full blur-[80px] group-hover:bg-secondary/20 transition-all duration-700" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif font-black italic mb-2 text-secondary">Community Growth</h3>
                        <p className="text-white/50 font-medium mb-8 max-w-sm">Detailed analysis shows your user base is growing by 15.4% week-on-week, mostly from social referrals.</p>
                        <button className="px-8 py-4 bg-white text-primary font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-all">Download Audit Report</button>
                    </div>
                </div>
                <div className="bg-secondary p-10 rounded-[40px] text-primary relative overflow-hidden flex items-center justify-between border border-secondary/20">
                    <div className="max-w-xs">
                        <h3 className="text-2xl font-black tracking-tighter uppercase italic leading-none mb-4">Support Response Time</h3>
                        <p className="text-primary/60 font-medium">Avg user resolution time is currently <span className="text-primary font-black underline underline-offset-4">4 minutes</span>. Excellent performance.</p>
                    </div>
                    <div className="w-24 h-24 rounded-full border-4 border-primary/10 border-t-primary animate-[spin_5s_linear_infinite] flex items-center justify-center">
                        <span className="text-xs font-black tracking-tighter">98%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
