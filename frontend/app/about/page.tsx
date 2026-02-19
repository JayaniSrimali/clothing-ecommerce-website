'use client';

import { motion } from 'framer-motion';
import { Award, Users, Leaf, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans pt-20">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="About Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/40" />
                </div>
                <div className="relative z-10 text-center text-white p-6">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="text-5xl md:text-7xl font-serif mb-4"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
                    >
                        Redefining elegance with a conscience.
                    </motion.p>
                </div>
            </section>

            {/* 2. Brand Narrative */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="space-y-6"
                    >
                        <h4 className="text-secondary font-bold uppercase tracking-widest text-sm">Who We Are</h4>
                        <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                            More than just a <br /> clothing brand.
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Founded in 2024, AURA was born from a simple idea: that fashion should feel as good as it looks. We combine timeless design with sustainable practices to create pieces that empower you to express your true self.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Every stitch tells a story of craftsmanship, dedication, and a commitment to our planet. We source the finest ethical materials to ensure that your wardrobe is a reflection of your values.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px]"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
                            alt="Fashion Detail"
                            className="w-full h-full object-cover rounded-sm shadow-2xl"
                        />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary p-8 text-white flex flex-col justify-center items-center shadow-lg hidden md:flex">
                            <span className="text-5xl font-serif font-bold">10+</span>
                            <span className="text-sm uppercase tracking-widest mt-2">Years Exp.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Our Values */}
            <section className="py-24 bg-[#FDFCFB] border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary mb-4">Our Core Values</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide every decision we make.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: "Sustainability", desc: "Eco-friendly materials and ethical production processes." },
                            { icon: Award, title: "Quality", desc: "Premium fabrics that stand the test of time." },
                            { icon: Users, title: "Community", desc: "Building a space where everyone belongs and thrives." },
                            { icon: Globe, title: "Inclusivity", desc: "Fashion designed for every body and every story." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100/50 hover:shadow-lg transition-all"
                            >
                                <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Team / Stats Section */}
            <section className="py-24 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { num: "50k+", label: "Happy Customers" },
                        { num: "100+", label: "Fashion Awards" },
                        { num: "12", label: "Countries Served" },
                        { num: "24/7", label: "Support System" }
                    ].map((stat, idx) => (
                        <div key={idx}>
                            <div className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.num}</div>
                            <div className="text-white/60 text-sm uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. CTA Area */}
            <section className="py-24 text-center">
                <h2 className="text-4xl font-serif text-primary mb-6">Join the Movement</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Experience the difference of mindful fashion. Shop our latest collection today.
                </p>
                <Link href="/shop" className="inline-block px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-lg hover:shadow-xl">
                    View Collection
                </Link>
            </section>
        </div>
    );
}
