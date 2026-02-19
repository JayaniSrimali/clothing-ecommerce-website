'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search, LogOut, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const { wishlist } = useWishlist();
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    const textColorClass = scrolled || !isHomePage ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white';
    const navBgClass = scrolled || !isHomePage ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent';
    const logoClass = scrolled || !isHomePage ? 'text-primary' : 'text-white';

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2">
                            <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${logoClass}`}>
                                AURA.
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors relative group ${textColorClass}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled || !isHomePage ? 'bg-primary' : 'bg-white'}`} />
                                </Link>
                            ))}
                        </div>

                        {/* Icons */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button className={`transition-colors ${textColorClass}`}>
                                <Search className="w-5 h-5" />
                            </button>

                            <Link href="/wishlist" className={`relative transition-colors group ${textColorClass}`}>
                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            <Link href="/cart" className={`relative transition-colors group ${textColorClass}`}>
                                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        {cart.reduce((a, b) => a + b.quantity, 0)}
                                    </motion.span>
                                )}
                            </Link>

                            {user ? (
                                <Link href="/profile" className="flex items-center gap-2 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold border-2 border-white/20">
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login" className={`transition-colors ${textColorClass}`}>
                                    <User className="w-5 h-5" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`transition-colors p-2 ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}
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
                        className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-8 flex flex-col items-center"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-gray-800"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col space-y-8 text-center text-2xl font-light tracking-wide w-full text-primary">
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
                                        className="block py-4 border-b border-gray-100 hover:text-secondary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="flex justify-center space-x-8 pt-8 text-gray-600">
                                <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                                    <Heart className="w-8 h-8" />
                                </Link>
                                <Link href="/cart" onClick={() => setIsOpen(false)}>
                                    <ShoppingCart className="w-8 h-8" />
                                </Link>
                                <Link href={user ? "/profile" : "/login"} onClick={() => setIsOpen(false)}>
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
