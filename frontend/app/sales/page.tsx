'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, Tag, Percent } from 'lucide-react';

interface Product {
    _id: string;
    title: string;
    price: number;
    originalPrice?: number; // Added for sale calculation
    image: string;
    category: string;
    description?: string;
}

export default function SalesPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 45, seconds: 12 });

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch Sale Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // In a real app, query ?onSale=true
                const res = await axios.get('http://localhost:5000/api/products');
                // Mocking sale data by filtering or transforming
                const saleProducts = res.data.map((p: any) => ({
                    ...p,
                    originalPrice: p.price * 1.4, // Mock original price
                    price: p.price
                })).slice(0, 8); // Just take first 8 for demo

                if (saleProducts.length > 0) {
                    setProducts(saleProducts);
                } else {
                    throw new Error("No products");
                }
            } catch (err) {
                // Fallback Layout Data
                setProducts([
                    { _id: '1', title: 'Wool Blend Coat', price: 199.99, originalPrice: 299.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036', category: 'Jackets' },
                    { _id: '2', title: 'Linen Summer Dress', price: 120.00, originalPrice: 159.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1083', category: 'Dresses' },
                    { _id: '3', title: 'Cashmere Sweater', price: 69.99, originalPrice: 89.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000', category: 'Hoodies' },
                    { _id: '4', title: 'Classic Chinos', price: 59.99, originalPrice: 79.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000', category: 'Pants' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white pt-20">

            {/* 1. HERO SECTION: Massive Impact */}
            <div className="relative bg-[#3E2723] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-sm font-bold tracking-widest uppercase mb-6 bg-white/10 backdrop-blur-md">
                            Limited Time Offer
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
                            End of Season <br />
                            <span className="text-[#F5C255]">Final Sale</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-md">
                            Get up to 50% off on our premium collection. Upgrade your style without breaking the bank. Exclusive designs for Men, Women & Kids.
                        </p>

                        <div className="flex flex-wrap gap-8 items-center mb-10 text-center">
                            {[
                                { val: timeLeft.days, label: 'Days' },
                                { val: timeLeft.hours, label: 'Hours' },
                                { val: timeLeft.minutes, label: 'Mins' },
                                { val: timeLeft.seconds, label: 'Secs' },
                            ].map((t, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-4xl font-bold font-mono">{String(t.val).padStart(2, '0')}</span>
                                    <span className="text-xs uppercase tracking-wider text-gray-400">{t.label}</span>
                                </div>
                            ))}
                        </div>

                        <button className="bg-white text-[#3E2723] px-10 py-4 font-bold rounded-full hover:bg-[#F5C255] transition-colors flex items-center gap-2 group">
                            Shop The Sale <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Hero Image */}
                    <div className="hidden md:block relative h-[500px]">
                        <motion.img
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
                            className="absolute right-0 top-0 w-3/4 h-full object-cover rounded-l-full shadow-2xl border-4 border-white/10"
                        />
                        <div className="absolute top-10 right-10 bg-[#D32F2F] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold shadow-xl rotate-12 animate-bounce">
                            <span className="text-sm">UP TO</span>
                            <span className="text-3xl leading-none">50%</span>
                            <span className="text-sm">OFF</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CATEGORY BANNERS */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Women's Sale", discount: "40% OFF", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000" },
                        { title: "Men's Sale", discount: "30% OFF", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1000" },
                        { title: "Kid's Sale", discount: "50% OFF", img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000" },
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="bg-[#D32F2F] px-2 py-1 text-xs font-bold rounded mb-2 inline-block">{cat.discount}</span>
                                <h3 className="text-2xl font-serif font-bold">{cat.title}</h3>
                                <div className="h-1 w-0 bg-white group-hover:w-full transition-all duration-300 mt-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. DISCOUNTED PRODUCTS GRID */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Flash Deals</h2>
                            <p className="text-gray-500">Grab these deals before they expire</p>
                        </div>
                        <a href="/shop" className="text-primary font-bold hover:underline flex items-center gap-1">View All Offers <ArrowRight className="w-4 h-4" /></a>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-xl" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product._id} className="relative group">
                                    {/* Sale Badge */}
                                    <div className="absolute top-3 left-3 z-10 bg-[#D32F2F] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                        <Tag className="w-3 h-3" />
                                        {product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20}% OFF
                                    </div>

                                    <ProductCard product={product} />

                                    {/* Price Overlay Override (Optional to show old price visually near the card if ProductCard doesn't support it strictly) */}
                                    {/* Note: ProductCard shows current price. We can add a visual overlay or just rely on the badge */}
                                    <div className="mt-2 flex justify-center gap-2 text-sm">
                                        <span className="line-through text-gray-400">${product.originalPrice?.toFixed(2)}</span>
                                        <span className="font-bold text-[#D32F2F]">${product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 4. NEWSLETTER / FOOTER PROMO */}
            <div className="bg-[#3E2723] text-white py-12 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <Percent className="w-12 h-12 mx-auto mb-4 text-[#F5C255]" />
                    <h2 className="text-3xl font-serif font-bold mb-4">Get Extra 10% Off</h2>
                    <p className="text-gray-300 mb-8">Subscribe to our newsletter and get an extra 10% discount on your first sale purchase.</p>
                    <div className="flex bg-white/10 p-1 rounded-full max-w-sm mx-auto backdrop-blur-sm border border-white/20">
                        <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-white placeholder-gray-400 px-6 py-3 flex-1" />
                        <button className="bg-white text-[#3E2723] px-6 py-3 rounded-full font-bold hover:bg-[#F5C255] transition-colors">Sign Up</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
