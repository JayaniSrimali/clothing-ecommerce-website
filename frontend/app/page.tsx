'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Star, Zap } from 'lucide-react';

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

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
        // Fallback for demo
        setProducts([
          { _id: '1', title: 'Premium Leather Jacket', price: 299.99, image: 'https://images.unsplash.com/photo-1551028919-64d60d47345a', category: 'jackets' },
          { _id: '2', title: 'Silk Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', category: 'dresses' },
          { _id: '3', title: 'Urban Streetwear Hoodie', price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', category: 'hoodies' },
          { _id: '4', title: 'Denim Classic Jeans', price: 79.99, image: 'https://images.unsplash.com/photo-1542272617-08f086303294', category: 'denim' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
              REDEFINE
            </span>
            <br />
            YOUR STYLE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
          >
            Discover the latest trends in luxury fashion. Exclusive collections dropped weekly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Show Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all text-white font-medium">
              View Lookbook
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Fast Shipping", desc: "Global delivery within 3-5 days" },
          { icon: <Star className="w-8 h-8 text-purple-400" />, title: "Premium Quality", desc: "Hand-picked materials for lasting comfort" },
          { icon: <ShoppingBag className="w-8 h-8 text-pink-400" />, title: "Secure Checkout", desc: "100% protected payments via Stripe" },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-colors"
          >
            <div className="mb-4 bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Featured Drops</h2>
          <a href="/shop" className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
