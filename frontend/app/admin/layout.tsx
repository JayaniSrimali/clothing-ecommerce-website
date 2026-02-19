'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Filter,
    Plus,
    Search
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Orders', href: '/admin/orders', icon: Filter },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-xl`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
                            AURA. <span className="text-xs font-normal opacity-70 block tracking-widest uppercase">Admin Panel</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white hover:text-gray-300">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-white/20 text-white font-medium shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <button className="flex items-center space-x-3 px-4 py-3 w-full text-left text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-primary">
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
                            />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
