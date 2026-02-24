'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search, Heart, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const { user } = useAuth();
    const { wishlist } = useWishlist();

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSearch(false);
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Hide Navbar on admin, login, register, forgot-password, and reset-password pages
    if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname.startsWith('/reset-password')) return null;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Sale', href: '/sales', isSale: true },
    ];

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed w-full z-50 transition-all duration-300 border-b border-white/5 bg-primary/95 backdrop-blur-xl shadow-2xl"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="flex items-center justify-between h-20 md:h-24">
                            {/* LEFT: Logo & Nav Links */}
                            <div className="flex items-center gap-12 lg:gap-20">
                                {/* Logo */}
                                <Link href="/" className="group flex items-center gap-2">
                                    <span className="text-2xl md:text-3xl font-black tracking-[0.15em] text-white font-outfit uppercase">
                                        Aura<span className="text-accent">.</span>
                                    </span>
                                </Link>

                                {/* Desktop Links */}
                                <div className="hidden md:flex items-center space-x-10">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`text-[13px] font-semibold transition-all duration-500 relative group uppercase tracking-[0.1em] font-outfit ${link.isSale ? 'text-red-300 hover:text-red-400' : 'text-white/80 hover:text-white'
                                                }`}
                                        >
                                            {link.name}
                                            <span className={`absolute -bottom-1.5 left-0 w-0 h-[2px] rounded-full transition-all duration-300 ease-out group-hover:w-full ${link.isSale ? 'bg-red-300' : 'bg-white'
                                                }`} />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: Search, Wishlist, Cart, Account */}
                            <div className="flex items-center space-x-6 lg:space-x-10">
                                {/* Search Button */}
                                <button
                                    onClick={() => setShowSearch(true)}
                                    className="hidden md:flex items-center gap-2.5 text-[12px] font-bold text-white/80 hover:text-white transition-all duration-300 group uppercase tracking-widest font-outfit"
                                >
                                    <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                    <span>Search</span>
                                </button>

                                <div className="h-6 w-[1.5px] bg-white/10 hidden md:block" />

                                <div className="flex items-center space-x-5 lg:space-x-8">
                                    {/* Wishlist */}
                                    <Link href="/wishlist" className="relative text-white/80 hover:text-white transition-all duration-300 group">
                                        <Heart className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110" />
                                        {wishlist.length > 0 && (
                                            <span className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-primary">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </Link>

                                    {/* Cart */}
                                    <Link href="/cart" className="relative text-white/80 hover:text-white transition-all duration-300 group">
                                        <ShoppingCart className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110" />
                                        {cart.length > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-primary shadow-sm"
                                            >
                                                {cart.reduce((a, b) => a + b.quantity, 0)}
                                            </motion.span>
                                        )}
                                    </Link>

                                    {/* Account */}
                                    {user ? (
                                        <Link href="/profile" className="flex items-center gap-3 transition-all duration-300">
                                            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-[12px] font-bold hover:bg-white hover:text-primary transition-colors">
                                                {user.name.charAt(0)}
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link href="/login" className="text-white/80 hover:text-white transition-all duration-300 group">
                                            <User className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110" />
                                        </Link>
                                    )}

                                    {/* Mobile Menu Button */}
                                    <div className="md:hidden">
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setShowSearch(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <motion.form
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onSubmit={handleSearch}
                            className="w-full max-w-3xl"
                        >
                            <div className="relative border-b-2 border-white/20 hover:border-white transition-colors">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 w-8 h-8" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                    className="w-full bg-transparent border-none text-3xl md:text-5xl font-serif text-white placeholder-white/20 py-6 pl-12 focus:ring-0 focus:outline-none"
                                />
                            </div>
                            <p className="text-white/40 mt-4 text-center text-sm">Press Enter to search</p>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-cream md:hidden pt-32 px-10 flex flex-col"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-primary p-2 hover:bg-primary/5 rounded-full transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col space-y-6 text-left">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-4xl font-black uppercase tracking-tighter font-outfit transition-all ${link.isSale ? 'text-red-500' : 'text-primary'}`}
                                    >
                                        {link.name}<span className="text-secondary opacity-50">.</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto mb-20 grid grid-cols-3 gap-4 pt-10 border-t border-primary/10">
                            <button
                                onClick={() => { setIsOpen(false); setShowSearch(true); }}
                                className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 font-outfit"
                            >
                                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-1">
                                    <Search className="w-5 h-5" />
                                </div>
                                Search
                            </button>
                            <Link
                                href="/wishlist"
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 font-outfit"
                            >
                                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-1">
                                    <Heart className="w-5 h-5" />
                                </div>
                                Wishlist
                            </Link>
                            <Link
                                href={user ? "/profile" : "/login"}
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 font-outfit"
                            >
                                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mb-1">
                                    <User className="w-5 h-5" />
                                </div>
                                Account
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
