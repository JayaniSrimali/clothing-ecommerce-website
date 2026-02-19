'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products'); // Replace with your actual API endpoint
                setProducts(res.data);
                setFilteredProducts(res.data);

                // Extract unique categories
                const cats = ['All', ...new Set(res.data.map((p: Product) => p.category))];
                setCategories(cats as string[]);
            } catch (err) {
                // Fallback data
                const demoProducts = [
                    { _id: '1', title: 'Midnight Silk Bomber', price: 299.99, image: 'https://images.unsplash.com/photo-1551028919-64d60d47345a', category: 'jackets' },
                    { _id: '2', title: 'Ethereal Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1', category: 'dresses' },
                    { _id: '3', title: 'Urban Tech Hoodie', price: 89.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', category: 'hoodies' },
                    { _id: '4', title: 'Vintage Denim', price: 79.99, image: 'https://images.unsplash.com/photo-1542272617-08f086303294', category: 'denim' },
                    { _id: '5', title: 'Classic White Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', category: 't-shirts' },
                    { _id: '6', title: 'Leather Boots', price: 199.99, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f', category: 'shoes' },
                ];
                setProducts(demoProducts);
                setFilteredProducts(demoProducts);
                setCategories(['All', 'jackets', 'dresses', 'hoodies', 'denim', 't-shirts', 'shoes']);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === category));
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        THE COLLECTION
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Browse our exclusive range of premium apparel. Designed for those who dare to stand out.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === category
                                    ? 'bg-white text-black scale-105 shadow-glow'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center h-64"><div className="animate-spin h-12 w-12 border-t-2 border-purple-500 rounded-full" /></div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                )}

                {filteredProducts.length === 0 && !loading && (
                    <div className="text-center py-24 text-gray-500">No products found in this category.</div>
                )}
            </div>
        </div>
    );
}
