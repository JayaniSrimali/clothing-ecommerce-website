'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'New Arrivals', href: '/shop' },
        { name: 'Lookbook', href: '#' },
        { name: 'Sale', href: '#' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2">
                            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-stone-200 to-stone-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                AURA.
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button className="text-gray-300 hover:text-white transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors group">
                                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        {cart.reduce((a, b) => a + b.quantity, 0)}
                                    </motion.span>
                                )}
                            </Link>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-purple-400">Hi, {user.name}</span>
                                    <button onClick={logout} className="text-gray-300 hover:text-red-500 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                    <User className="w-5 h-5" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:text-white transition-colors p-2"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
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
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-8 flex flex-col items-center"
                    >
                        <div className="flex flex-col space-y-8 text-center text-2xl font-light tracking-wide w-full">
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
                                        className="block py-4 border-b border-white/10 hover:text-purple-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="flex justify-center space-x-8 pt-8">
                                <Link href="/cart" onClick={() => setIsOpen(false)}>
                                    <ShoppingCart className="w-8 h-8" />
                                </Link>
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <User className="w-8 h-8" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
