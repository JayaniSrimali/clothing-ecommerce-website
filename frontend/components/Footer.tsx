'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, ShoppingBag, Send } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();

    // Hide Footer on admin, login, register, forgot-password, and reset-password pages
    if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname.startsWith('/reset-password')) return null;

    return (
        <footer className="relative mt-32 bg-primary text-white/80 font-sans border-t border-white/10">

            {/* Floating Newsletter Section */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 z-10">
                <div className="bg-secondary rounded-[30px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-white/10">
                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    {/* Left Content with Icon */}
                    <div className="flex items-center gap-6 z-10">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                            <ShoppingBag className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-white">
                            <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
                            <p className="text-white/80 text-sm max-w-md">
                                Get 20% off on your first order just by subscribing to our newsletter. Update your wardrobe with the latest trends.
                            </p>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="w-full md:w-auto z-10">
                        <form className="flex bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20 w-full md:w-[400px]">
                            <div className="flex items-center pl-4 w-full">
                                <Mail className="w-5 h-5 text-white/60 mr-3" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent border-none text-white placeholder-white/60 text-sm w-full focus:outline-none focus:ring-0"
                                />
                            </div>
                            <button className="bg-white text-primary px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shrink-0">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-white/40 text-[10px] mt-3 ml-4">
                            You will be able to unsubscribe at any time. <br /> Read our <Link href="#" className="underline hover:text-white">privacy policy here</Link>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="pt-48 pb-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary font-serif font-bold text-xl">
                                A
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                AURA.
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-white/60">
                            Timeless elegance for the modern individual. Quality, sustainability, and style in every stitch.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/70">
                            {['New Arrivals', 'Men', 'Women', 'Accessories', 'Sale'].map(item => (
                                <li key={item}>
                                    <Link href="/shop" className="hover:text-white transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Customer Care</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/70">
                            {['Order Status', 'Returns & Exchanges', 'Size Guide', 'FAQ'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-bold text-white mb-6">About Aura</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/70">
                            {['Our Story', 'Sustainability', 'Careers', 'Store Locator'].map(item => (
                                <li key={item}>
                                    <Link href="/about" className="hover:text-white transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/70">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-white" />
                                <span>(91) 98765 4321 54</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-white" />
                                <span>support@aura.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 bg-black/20">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
                    <p>&copy; {new Date().getFullYear()} Aura Clothing Co. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Use</Link>
                        <Link href="#" className="hover:text-white">Legal</Link>
                        <Link href="#" className="hover:text-white">Site Map</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
