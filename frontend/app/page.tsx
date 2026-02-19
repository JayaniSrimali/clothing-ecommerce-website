'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Play,
    Truck,
    ShieldCheck,
    RefreshCw,
    Gift,
    Star
} from 'lucide-react';
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
                    { _id: '1', title: 'Savile Row Overcoat', price: 349.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000', category: 'men' },
                    { _id: '2', title: 'Venice Linen Gown', price: 219.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000', category: 'women' },
                    { _id: '3', title: 'Heritage Denim', price: 129.99, image: 'https://images.unsplash.com/photo-1536766768598-e0921313a283?q=80&w=1000', category: 'men' },
                    { _id: '4', title: 'Merino Wool Knit', price: 189.99, image: 'https://images.unsplash.com/photo-1517445312882-566f1745d9b3?q=80&w=1000', category: 'women' },
                    { _id: '5', title: 'Soho Leather Boots', price: 299.00, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000', category: 'men' },
                    { _id: '6', title: 'Silk Night Gown', price: 450.00, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000', category: 'women' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white min-h-screen text-primary selection:bg-primary selection:text-white overflow-hidden font-sans" ref={containerRef}>

            {/* 1. Hero Section (Full Width Background with Overlay) */}
            <section className="relative w-full h-screen flex items-center bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="bg-white/90 backdrop-blur-md p-10 md:p-16 max-w-2xl rounded-sm shadow-2xl"
                    >
                        <motion.span variants={fadeInUp} className="text-secondary font-bold text-xs tracking-[0.3em] uppercase block mb-4">
                            New Summer Collection 2026
                        </motion.span>
                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-primary leading-[1] mb-6 tracking-tight">
                            Summer Style <br /><span className="italic text-secondary">Sensations.</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
                            Discover the warmth of our latest sustainable collection. Earth tones, premium fabrics, and timeless cuts designed for you.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex items-center gap-6">
                            <Link href="/shop" className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-lg hover:shadow-xl">
                                Shop Now
                            </Link>
                            <button className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-primary hover:border-primary hover:bg-primary hover:text-white transition-all group bg-white">
                                <Play size={18} className="fill-current ml-1" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Trending Products (Carousel Style) */}
            <section className="py-24 px-6 bg-[#F5F5F0]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-2">Trending Product</h2>
                            <p className="text-gray-500 text-sm">Follow the most popular trends and get exclusive items.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all text-primary">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="p-3 rounded-full border border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all text-primary">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            [1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-white/50 animate-pulse rounded-2xl" />)
                        ) : (
                            products.slice(0, 4).map((product, idx) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Promotional Banners (3 Cols) */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Spring Style', sub: 'New Trending', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', btn: 'Explore Now' },
                        { title: '-25% Off Items', sub: 'Big Shipping Over Order $150', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800', btn: 'Shop Now' },
                        { title: 'New Arrivals', sub: 'Winter Collection 2026', img: 'https://images.unsplash.com/photo-1520975686474-180fa4970471?q=80&w=800', btn: 'Explore Now' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="relative h-[400px] rounded-[30px] overflow-hidden group cursor-pointer shadow-lg"
                        >
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10 text-white">
                                <p className="text-secondary text-xs uppercase font-bold tracking-widest mb-2">{item.sub}</p>
                                <h3 className="text-3xl font-serif mb-8">{item.title}</h3>
                                <button className="self-start px-8 py-3 bg-white text-primary text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-md">
                                    {item.btn}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Top Categories (Circular) */}
            <section className="py-24 bg-[#EFEBE9]/30">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif text-primary mb-16">Top Category</h2>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                        {[
                            { name: "Kids Fashion", img: "https://images.unsplash.com/photo-1621452773781-0f992ee03591?q=80&w=400" },
                            { name: "Men's Fashion", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=400" },
                            { name: "New Arrivals", img: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=400" },
                            { name: "Women's Fashion", img: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=400" },
                            { name: "Top Sales", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400" },
                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-6 cursor-pointer group"
                            >
                                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-primary transition-all duration-300">
                                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-serif text-lg text-primary font-medium tracking-wide group-hover:text-secondary transition-colors">{cat.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Service Features */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                        { icon: Truck, title: "Worldwide Shipping", sub: "World wide from $150 only" },
                        { icon: ShieldCheck, title: "Secure Payment", sub: "Safe & Secured Payment" },
                        { icon: RefreshCw, title: "30 Days Free Return", sub: "Within 30 days for an exchange" },
                        { icon: Gift, title: "Surprise Gift", sub: "Free gift cards & reserves" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-secondary group-hover:text-secondary group-hover:bg-white transition-all duration-500">
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base mb-1 tracking-wide">{item.title}</h4>
                                <p className="text-xs text-white/50">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Best Selling Products */}
            <section className="py-24 px-6 max-w-7xl mx-auto bg-[#FDFCFB]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-primary mb-2">Best Selling Product</h2>
                    <p className="text-gray-500 text-sm">Follow the most popular trends and get exclusive items.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {loading ? (
                        [1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse rounded-2xl" />)
                    ) : (
                        // Repeating products for demo to fill grid
                        [...products, ...products].slice(0, 8).map((product, idx) => (
                            <motion.div
                                key={`${product._id}-${idx}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* 7. Promotional / Deal Section */}
            <section className="py-24 bg-[#EFEBE9] overflow-hidden relative">
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#5D4037 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute top-10 left-10 w-full h-full border-[2px] border-primary/10 -z-10 rounded-[50px]" />
                        <img
                            src="https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=800"
                            alt="Fashion Deal"
                            className="rounded-[50px] shadow-2xl w-full max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 border-8 border-white"
                        />
                        <div className="absolute top-8 right-12 w-28 h-28 bg-primary text-white rounded-full flex flex-col items-center justify-center shadow-xl animate-bounce border-4 border-white/20">
                            <span className="font-black text-3xl">50%</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest">OFF</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-10"
                    >
                        <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm">
                            <span className="font-serif italic font-bold text-2xl">A.</span>
                        </span>
                        <h2 className="text-5xl lg:text-7xl font-serif text-primary leading-[1.1]">
                            Modern & Stylish <br /> Fashion We Are <br /> <span className="italic text-secondary">In Online Store.</span>
                        </h2>

                        <div className="flex gap-8 py-2">
                            {[
                                { val: "192", label: "Days" },
                                { val: "10", label: "Hours" },
                                { val: "45", label: "Mins" },
                                { val: "20", label: "Secs" },
                            ].map((time, idx) => (
                                <div key={idx} className="text-center group">
                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-3xl font-black text-primary font-serif mb-2 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">{time.val}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{time.label}</div>
                                </div>
                            ))}
                        </div>

                        <Link href="/shop" className="inline-block px-12 py-5 bg-primary text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary hover:shadow-xl rounded-full transition-all">
                            Shop Collection
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 8. Marquee Text Strip */}
            <div className="bg-secondary py-5 overflow-hidden border-y border-white/10">
                <div className="flex whitespace-nowrap gap-16 animate-marquee text-white font-black uppercase tracking-[0.4em] text-4xl opacity-90">
                    <span>Welcome to our store</span>
                    <span className="text-primary">•</span>
                    <span>New Collection 2026</span>
                    <span className="text-primary">•</span>
                    <span>Worldwide Shipping</span>
                    <span className="text-primary">•</span>
                    <span>Welcome to our store</span>
                    <span className="text-primary">•</span>
                    <span>New Collection 2026</span>
                    <span className="text-primary">•</span>
                    <span>Worldwide Shipping</span>
                </div>
            </div>

            {/* 9. Reviews / Testimonials */}
            <section className="py-24 bg-[#FDFCFB] text-center">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-serif text-primary mb-16">Customer Review</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((r) => (
                            <motion.div
                                key={r}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-white rounded-t-[40px] rounded-br-[40px] border border-gray-100/50 text-left shadow-xl shadow-gray-100/50 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="text-secondary fill-secondary" />)}
                                </div>
                                <p className="text-gray-600 text-base mb-8 leading-relaxed font-light">"Absolutely love the quality and cut of the fabrics. AURA never disappoints with their elegance."</p>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                    <div>
                                        <h4 className="text-base font-bold text-primary">Sarah J.</h4>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Loyal Customer</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. Lookbook / Instagram Grid */}
            <section className="py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-primary">Shop by Instagram</h2>
                    <p className="text-gray-400 italic mt-2">@aura.official</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 h-[300px] md:h-[250px]">
                    {[
                        'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
                        'https://images.unsplash.com/photo-1509631179647-0177331693ae',
                        'https://images.unsplash.com/photo-1503342394128-c104d54dba01',
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
                        'https://images.unsplash.com/photo-1529139574466-a302d2d3f524'
                    ].map((img, i) => (
                        <div key={i} className="relative group overflow-hidden h-full">
                            <img src={`${img}?q=80&w=600&auto=format&fit=crop`} alt="Lookbook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white p-3 rounded-full text-primary shadow-lg"><Star size={20} /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

// Add to globals.css for marquee animation
// .animate-marquee { animation: marquee 20s linear infinite; }
// @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
