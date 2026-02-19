'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();

    return (
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            LUXE
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link href="/shop" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
                            <Link href="/about" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6 space-x-4">
                            <Link href="/cart" className="relative p-1 rounded-full hover:bg-white/10 transition-colors">
                                <ShoppingCart className="h-6 w-6" />
                                {cart.length > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        {cart.reduce((a, b) => a + b.quantity, 0)}
                                    </span>
                                )}
                            </Link>
                            <Link href="/login" className="p-1 rounded-full hover:bg-white/10 transition-colors">
                                <User className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
                        <Link href="/shop" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Shop</Link>
                        <Link href="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Cart ({cart.length})</Link>
                        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Login</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
