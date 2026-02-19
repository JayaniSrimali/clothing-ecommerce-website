'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products as initialProducts } from '@/data/products';
import { motion } from 'framer-motion';

export default function Shop() {
    const [activeFilter, setActiveFilter] = useState('All');
    const categories = ['All', 'Jackets', 'Dresses', 'Accessories', 'Outerwear', 'Knitwear', 'Pants'];

    const filteredProducts = activeFilter === 'All'
        ? initialProducts
        : initialProducts.filter(p => p.category === activeFilter);

    return (
        <div className="bg-gray-950 min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            Curated Collection
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore our exclusive range of premium apparel designed for the modern connoisseur.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all duration-300 border ${activeFilter === category
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transform scale-105'
                                    : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {filteredProducts.map((product) => (
                        //@ts-ignore
                        <ProductCard key={product._id} product={product} />
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-2xl text-gray-500">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
