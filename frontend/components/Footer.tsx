'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-black to-slate-900 text-white py-16 px-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        AURA
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Leading the revolution in modern fashion. We craft experiences, not just clothes.
                    </p>
                    <div className="flex gap-4">
                        <Facebook className="w-5 h-5 cursor-pointer hover:text-purple-400 transition-colors" />
                        <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400 transition-colors" />
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
                        <Linkedin className="w-5 h-5 cursor-pointer hover:text-indigo-400 transition-colors" />
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide uppercase text-gray-200">Shop</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        {['New Arrivals', 'Best Sellers', 'Men', 'Women', 'Accessories', 'Sale'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide uppercase text-gray-200">Support</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        {['Order Status', 'Shipping & Returns', 'Size Guide', 'FAQ', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide uppercase text-gray-200">Stay Updated</h4>
                    <p className="text-gray-400 text-sm mb-4">
                        Subscribe to our newsletter for exclusive drops.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Mail className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 mt-16 pt-8 text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Aura Clothing Co. All rights reserved.</p>
            </div>
        </footer>
    );
}
