'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch products', err);
                setProducts([
                    { _id: '1', title: 'Midnight Silk Bomber', price: 299.99, image: 'https://images.unsplash.com/photo-1551028919-64d60d47345a', category: 'jackets' },
                    { _id: '2', title: 'Ethereal Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', category: 'dresses' },
                    { _id: '3', title: 'Urban Tech Hoodie', price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', category: 'hoodies' },
                    { _id: '4', title: 'Vintage Denim', price: 79.99, image: 'https://images.unsplash.com/photo-1542272617-08f086303294', category: 'denim' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-black min-h-screen text-white overflow-hidden">

            {/* 1. Immersive Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Video/Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Fashion"
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 text-center space-y-8 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-[12vw] font-black leading-none tracking-tighter mix-blend-difference text-white">
                            ELEVATE
                        </h1>
                        <h1 className="text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
                            YOURSELF
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xl md:text-2xl font-light tracking-wide text-gray-300 max-w-2xl mx-auto"
                    >
                        Where luxury meets the streets. Defined by attitude, tailored for impact.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Link href="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Shop The Collection <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 2. Scrolling Marquee */}
            <div className="py-12 bg-purple-600 overflow-hidden whitespace-nowrap -rotate-1 origin-left scale-105">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex space-x-12 text-4xl font-bold uppercase tracking-widest text-black/80"
                >
                    {Array(10).fill("New Collection Drop • Free Shipping Worldwide • Premium Quality • ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </motion.div>
            </div>

            {/* 3. Featured Categories */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="relative rounded-2xl overflow-hidden group h-full"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt="Women"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <h2 className="text-6xl font-black uppercase tracking-tighter">Women</h2>
                        </div>
                    </motion.div>
                    <div className="grid grid-rows-2 gap-4 h-full">
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="relative rounded-2xl overflow-hidden group h-full"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1542272617-08f086303294?auto=format&fit=crop&w=800&q=80"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt="Men"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <h2 className="text-4xl font-bold uppercase tracking-widest">Men</h2>
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="relative rounded-2xl overflow-hidden group h-full bg-zinc-900 flex items-center justify-center"
                        >
                            <div className="text-center p-8">
                                <h3 className="text-3xl font-bold mb-4 text-gradient">Accessories</h3>
                                <p className="text-gray-400 mb-6">Complete your look with our curated selection.</p>
                                <Link href="/shop" className="text-white border-b border-white pb-1 hover:text-purple-400 hover:border-purple-400 transition-colors">
                                    View Items &rarr;
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Latest Drops */}
            <section className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Drops</h2>
                            <div className="h-1 w-24 bg-purple-500 rounded-full" />
                        </div>
                        <Link href="/shop" className="hidden md:block text-gray-400 hover:text-white transition-colors">
                            View All Products
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-[3/4] bg-zinc-900 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/shop" className="inline-block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Values */}
            <section className="py-24 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
                    {[
                        { icon: <Globe className="w-10 h-10 mb-6 text-purple-500 mx-auto" />, title: "Global Shipping", desc: "We ship to over 50 countries worldwide." },
                        { icon: <ShieldCheck className="w-10 h-10 mb-6 text-pink-500 mx-auto" />, title: "Secure Payments", desc: "Your data is protected with 256-bit encryption." },
                        { icon: <Truck className="w-10 h-10 mb-6 text-indigo-500 mx-auto" />, title: "Fast Delivery", desc: "Get your order in 3-5 business days." },
                    ].map((item, idx) => (
                        <div key={idx} className="p-8 bg-zinc-900/50 rounded-2xl hover:bg-zinc-900 transition-colors">
                            {item.icon}
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
