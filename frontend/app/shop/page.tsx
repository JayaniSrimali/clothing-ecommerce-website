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
                // Fetch from API
                const res = await axios.get('http://localhost:5000/api/products');
                if (res.data && res.data.length > 0) {
                    setProducts(res.data);
                    setFilteredProducts(res.data);
                    const cats = ['All', ...new Set(res.data.map((p: Product) => p.category))];
                    setCategories(cats as string[]);
                } else {
                    throw new Error("No products found");
                }
            } catch (err) {
                // Fallback data matching the brown aesthetic
                const demoProducts = [
                    { _id: '1', title: 'Wool Blend Coat', price: 299.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036', category: 'jackets' },
                    { _id: '2', title: 'Linen Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1083', category: 'dresses' },
                    { _id: '3', title: 'Cashmere Sweater', price: 89.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000', category: 'hoodies' },
                    { _id: '4', title: 'Classic Chinos', price: 79.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000', category: 'pants' },
                    { _id: '5', title: 'Silk Blouse', price: 120.00, image: 'https://images.unsplash.com/photo-1517445312882-566f1745d9b3?q=80&w=1000', category: 'shirts' },
                    { _id: '6', title: 'Leather Loafers', price: 199.99, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000', category: 'shoes' },
                ];
                setProducts(demoProducts);
                setFilteredProducts(demoProducts);
                setCategories(['All', 'jackets', 'dresses', 'hoodies', 'pants', 'shirts', 'shoes']);
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
        <div className="min-h-screen bg-white text-primary pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-serif mb-4 text-primary">
                        The Collection
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-light">
                        Discover our range of ethically sourced, premium apparel.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-6 py-2 rounded-none text-sm font-medium uppercase tracking-wider transition-all border ${selectedCategory === category
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center h-64"><div className="animate-spin h-12 w-12 border-t-2 border-primary rounded-full" /></div>
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
                    <div className="text-center py-24 text-gray-500 font-light">No products found in this category.</div>
                )}
            </div>
        </div>
    );
}
