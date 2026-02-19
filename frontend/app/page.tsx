'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products'; // Use mock for consistency first
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-gray-950/60 to-gray-950 z-0" />

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter mix-blend-overlay text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            ELEVATE
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              ESSENTIALS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 font-light tracking-wide max-w-2xl mx-auto drop-shadow-lg"
          >
            Discover the new era of luxury streetwear. Meticulously crafted for the bold.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/shop" className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]">
              <span className="relative z-10 flex items-center gap-2">
                Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto mb-2"></div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 -mt-24 relative z-30 mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="w-10 h-10 text-yellow-400" />, title: "Instant Delivery", desc: "Same-day dispatch on all orders placed before 2PM." },
            { icon: <Star className="w-10 h-10 text-purple-400" />, title: "Premium Materials", desc: "Sourced from the finest mills in Italy and Japan." },
            { icon: <ShoppingBag className="w-10 h-10 text-pink-400" />, title: "Secure Shopping", desc: "Protected by industry-leading encryption standards." },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-gray-900/80 border border-gray-800 backdrop-blur-xl hover:bg-gray-800/80 transition-colors shadow-2xl"
            >
              <div className="mb-6 bg-gray-800/50 w-20 h-20 rounded-2xl flex items-center justify-center border border-gray-700/50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 mb-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-purple-500 font-bold uppercase tracking-widest mb-2 block">New Arrivals</span>
            <h2 className="text-5xl font-black text-white">Trending Now</h2>
          </div>
          <Link href="/shop" className="group text-white font-bold flex items-center gap-2 border-b border-white/20 pb-1 hover:border-white transition-colors">
            View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            //@ts-ignore
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Inner Circle</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Get exclusive access to limited drops, events, and member-only pricing.
          </p>

          <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-gray-900/50 border border-gray-700 rounded-full px-8 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 backdrop-blur-sm transition-all"
            />
            <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-gray-200 transition-transform active:scale-95 shadow-lg shadow-white/10">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
