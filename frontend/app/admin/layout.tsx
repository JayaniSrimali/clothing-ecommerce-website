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
    Search,
    Bell,
    ChevronRight,
    ClipboardList
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Orders', href: '/admin/orders', icon: ClipboardList },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex font-sans selection:bg-primary selection:text-white">
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {!isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '280px' : '0px', x: isSidebarOpen ? 0 : -280 }}
                className="fixed lg:relative inset-y-0 left-0 z-50 bg-primary text-white overflow-hidden shadow-2xl transition-all duration-300 ease-in-out"
            >
                <div className="h-full flex flex-col w-[280px]">
                    <div className="p-8 flex items-center justify-between">
                        <Link href="/" className="group">
                            <h1 className="text-3xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform">
                                AURA<span className="text-secondary text-4xl">.</span>
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mt-[-4px]">Executive Panel</p>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white p-2">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 px-4 py-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${isActive ? 'bg-white text-primary shadow-lg shadow-black/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute left-0 w-1.5 h-6 bg-secondary rounded-r-full"
                                        />
                                    )}
                                    <Icon size={20} className={isActive ? 'text-primary' : 'group-hover:scale-110 transition-transform'} />
                                    <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                                    {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-6">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Support</p>
                            <button className="w-full py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-white transition-colors text-sm shadow-lg">
                                Get Help
                            </button>
                        </div>
                        <button className="flex items-center gap-4 px-6 py-4 w-full text-left text-white/40 hover:text-red-400 rounded-xl transition-all mt-6 group">
                            <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span className="font-bold text-sm tracking-wide uppercase">Sign Out</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Header */}
                <header className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-transparent'} h-24 flex items-center justify-between px-8`}>
                    <div className="flex items-center gap-6">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
                                <Menu size={20} />
                            </button>
                        )}
                        <div className="hidden sm:block">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Aura Workspace</h2>
                            <p className="text-xl font-serif text-primary font-bold">Good morning, Admin</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 w-80 transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary hover:shadow-md transition-all relative">
                                <Bell size={20} />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
                            </button>
                            <div className="h-10 w-[1px] bg-gray-100 mx-2" />
                            <Link href="/admin/settings" className="flex items-center gap-3 p-1 pr-4 bg-white border border-gray-100 rounded-full hover:shadow-md transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-all">
                                    AD
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-xs font-bold text-primary leading-none">Admin User</p>
                                    <p className="text-[10px] text-gray-400 font-medium">System Manager</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content Area Wrap */}
                <main className="flex-1 p-8 pt-4 relative z-10 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="max-w-[1600px] mx-auto"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
