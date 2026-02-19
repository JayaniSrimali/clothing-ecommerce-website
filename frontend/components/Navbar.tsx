'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search, Heart, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const { user } = useAuth();
    const { wishlist } = useWishlist();
    const pathname = usePathname();

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
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed w-full z-50 bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* LEFT: Logo & Nav Links */}
                        <div className="flex items-center gap-12">
                            {/* Logo */}
                            <Link href="/" className="group flex items-center gap-2">
                                <span className="text-2xl font-black tracking-tighter text-white">
                                    AURA.
                                </span>
                            </Link>

                            {/* Desktop Links - Left Aligned */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors relative group uppercase tracking-wide ${link.isSale ? 'text-red-300 hover:text-red-200 font-bold' : 'text-white/80 hover:text-white'
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${link.isSale ? 'bg-red-300' : 'bg-white'
                                            }`} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Search, Wishlist, Cart, Account */}
                        <div className="flex items-center space-x-4 lg:space-x-8">

                            {/* Search Text Link */}
                            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group">
                                <Search className="w-4 h-4" />
                                <span className="uppercase tracking-wide">Search</span>
                            </button>

                            <div className="h-4 w-px bg-white/20 hidden md:block" />

                            {/* Wishlist Text Link */}
                            <Link href="/wishlist" className="hidden md:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group">
                                <div className="relative">
                                    <Heart className="w-4 h-4" />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-primary text-[8px] font-bold w-2.5 h-2.5 rounded-full flex items-center justify-center">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </div>
                                <span className="uppercase tracking-wide">Wishlist</span>
                            </Link>

                            {/* Cart Text Link */}
                            <Link href="/cart" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group">
                                <div className="relative">
                                    <ShoppingCart className="w-4 h-4" />
                                    {cart.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 bg-white text-primary text-[8px] font-bold w-2.5 h-2.5 rounded-full flex items-center justify-center shadow-sm"
                                        >
                                            {cart.reduce((a, b) => a + b.quantity, 0)}
                                        </motion.span>
                                    )}
                                </div>
                                <span className="uppercase tracking-wide hidden md:block">Cart</span>
                            </Link>

                            {/* Account Text Link */}
                            {user ? (
                                <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary text-[10px] font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="uppercase tracking-wide hidden md:block">Account</span>
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
                                    <User className="w-4 h-4" />
                                    <span className="uppercase tracking-wide hidden md:block">Login</span>
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <div className="md:hidden ml-4">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-white p-1"
                                >
                                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-8 flex flex-col items-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-gray-800"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col space-y-8 text-center text-xl font-light tracking-wide w-full text-primary">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-4 border-b border-gray-50 hover:text-secondary transition-colors ${link.isSale ? 'text-red-500 font-bold' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="flex justify-center space-x-8 pt-8 text-gray-600 border-t border-gray-100 w-full mt-4">
                                <Link href="#" className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest">
                                    <Search className="w-6 h-6 mb-1" />
                                    Search
                                </Link>
                                <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest">
                                    <Heart className="w-6 h-6 mb-1" />
                                    Wishlist
                                </Link>
                                <Link href={user ? "/profile" : "/login"} onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest">
                                    <User className="w-6 h-6 mb-1" />
                                    Account
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
