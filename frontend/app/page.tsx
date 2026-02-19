'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Tag, ChevronDown } from 'lucide-react';
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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                if (res.data && res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    throw new Error("No products found");
                }
            } catch (err) {
                console.log('Using fallback products:', err);
                setProducts([
                    { _id: '1', title: 'Wool Blend Coat', price: 299.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000', category: 'men' },
                    { _id: '2', title: 'Linen Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000', category: 'women' },
                    { _id: '3', title: 'Kids Denim Jacket', price: 49.99, image: 'https://images.unsplash.com/photo-1519238263496-6361937a4ce6?q=80&w=1000', category: 'kids' },
                    { _id: '4', title: 'Classic Chinos', price: 79.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000', category: 'men' },
                    { _id: '5', title: 'Silk Blouse', price: 120.00, image: 'https://images.unsplash.com/photo-1517445312882-566f1745d9b3?q=80&w=1000', category: 'women' },
                    { _id: '6', title: 'Little Explorer Tee', price: 25.00, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000', category: 'kids' },
                    { _id: '7', title: 'Leather Loafers', price: 199.99, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000', category: 'men' },
                    { _id: '8', title: 'Summer Hat', price: 45.00, image: 'https://images.unsplash.com/photo-1565985390740-49666060c5c3?q=80&w=1000', category: 'women' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const featuredProducts = products.filter(p => p.category === 'men' || p.category === 'women').slice(0, 4);
    const bestSellers = products.slice(4, 8);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="bg-white min-h-screen text-primary overflow-x-hidden" ref={containerRef}>

            {/* 1. Hero Banner (Parallax) */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-4 border border-white/50 text-white text-sm uppercase tracking-[0.2em] mb-6 backdrop-blur-sm rounded-full">
                            New Collection 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 drop-shadow-2xl tracking-tighter"
                    >
                        Autumn Whisper
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        Discover the warmth of our latest sustainable collection. Earth tones, premium fabrics, and timeless cuts designed for you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link href="/shop" className="group px-10 py-4 bg-white text-primary font-bold hover:bg-cream transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                            Shop Women <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/shop" className="group px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                            Shop Men <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce"
                >
                    <ChevronDown className="w-8 h-8" />
                </motion.div>
            </section>

            {/* 2. Featured Products (Staggered Grid) */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
                >
                    <div>
                        <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">Curated For You</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary">Featured Products</h2>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors border-b border-primary/20 pb-1">
                        View All Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* 3. Categories (Hover Reveal) */}
            <section className="py-24 bg-cream relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif text-center mb-20 text-primary"
                    >
                        Shop by Category
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px]">
                        {[
                            { name: 'MEN', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=800', link: '/shop?category=men' },
                            { name: 'WOMEN', img: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800', link: '/shop?category=women' },
                            { name: 'KIDS', img: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800', link: '/shop?category=kids' }
                        ].map((cat, idx) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Link href={cat.link} className="relative group overflow-hidden h-full block rounded-sm shadow-xl">
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="border border-white/50 px-10 py-6 backdrop-blur-sm bg-white/10 group-hover:bg-white/90 group-hover:text-primary transition-all duration-500">
                                            <h3 className="text-3xl font-serif text-white group-hover:text-primary tracking-widest">{cat.name}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Best Sellers */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    className="text-center mb-16"
                >
                    <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-4 block">Crowd Favorites</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-primary">Best Sellers</h2>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestSellers.length > 0 ? bestSellers.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        )) : (
                            <p className="col-span-4 text-center text-gray-400">Loading best sellers...</p>
                        )}
                    </div>
                )}
            </section>

            {/* 5. Promotions (Parallax & Tilt) */}
            <section className="py-32 bg-primary text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-5 pattern-dots" />

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 text-accent">
                            <Tag className="w-6 h-6" />
                            <span className="font-bold tracking-[0.2em] uppercase">Limited Time Offer</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif leading-none">
                            End of <br /> Season <span className="text-accent italic">Sale</span>
                        </h2>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Upgrade your wardrobe with premium essentials. Up to 50% off on selected items for a limited time.
                        </p>
                        <Link href="/shop" className="inline-block bg-white text-primary px-12 py-5 font-bold hover:bg-accent hover:text-primary transition-colors text-lg shadow-xl">
                            Shop The Sale
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                        whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: true }}
                        className="relative h-[500px] bg-white/5 backdrop-blur-md rounded-2xl p-10 border border-white/10 flex items-center justify-center shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800"
                            alt="Sale Item"
                            className="max-h-full object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-8 right-8 bg-red-600 text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl animate-pulse shadow-xl border-4 border-white/20">
                            -50%
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-32 bg-white text-center px-4 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <Star className="w-10 h-10 text-secondary mx-auto mb-8 animate-spin-slow" />
                    <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Join the AURA Community</h2>
                    <p className="text-gray-500 mb-10 text-lg">
                        Unlock 10% off your first order and be the first to know about exclusive drops and private sales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-transparent text-lg placeholder:text-gray-400"
                        />
                        <button className="px-10 py-4 bg-primary text-white font-bold hover:bg-secondary transition-colors text-lg shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
