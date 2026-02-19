'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { Check, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
}

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                // Fallback for demo
                setProduct({
                    _id: id as string,
                    title: 'Premium Leather Jacket',
                    price: 299.99,
                    image: 'https://images.unsplash.com/photo-1551028919-64d60d47345a',
                    description: 'Crafted from the finest Italian leather, this jacket embodies improved durability and timeless style. Features zippered cuffs, a snap-for-closure collar, and a tailored fit that accentuates the silhouette.',
                    category: 'Jackets',
                    stock: 10
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-gray-900 rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                    <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 sticky top-24"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{product.title}</h1>
                            <p className="text-purple-400 text-lg capitalize">{product.category}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                            <div className="flex items-center text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="ml-1 text-gray-300">4.9 (128 reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        {/* Size Selector */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-300 mb-4 uppercase tracking-wide">Select Size</h3>
                            <div className="flex gap-4">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all ${selectedSize === size
                                                ? 'bg-white text-black scale-110 shadow-lg'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-8 border-t border-gray-800">
                            <button
                                onClick={() => addToCart({ ...product, quantity: 1, id: product._id, name: product.title })} // Adapter for context
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] shadow-lg"
                            >
                                Add to Cart
                            </button>
                            <button className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                                <Shield className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4 pt-8">
                            <div className="flex items-center text-gray-400">
                                <Truck className="w-5 h-5 mr-3 text-purple-500" />
                                <span>Free shipping on orders over $200</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Check className="w-5 h-5 mr-3 text-green-500" />
                                <span>In stock and ready to ship</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <Shield className="w-5 h-5 mr-3 text-blue-500" />
                                <span>30-day return policy</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
