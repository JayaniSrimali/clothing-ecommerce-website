'use client';

import { useCart } from '../context/CartContext';
import { notFound } from 'next/navigation';
import { products } from '../../data/products';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: { id: string } }) {
    const { addToCart } = useCart();
    const product = products.find((p) => p._id === params.id);

    if (!product) return notFound();

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-8">
                <Link
                    href="/shop"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-2xl relative border border-gray-800"
                    >
                        <div className="aspect-[3/4] md:aspect-square relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center h-full"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30">
                                In Stock
                            </span>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={() => addToCart({
                                    id: product._id,
                                    name: product.title,
                                    price: product.price,
                                    image: product.image,
                                    quantity: 1
                                })}
                                className="flex-1 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 flex items-center justify-center gap-3 text-lg"
                            >
                                <ShoppingBag className="w-5 h-5" /> Add to Cart
                            </button>

                            <button className="flex-1 border border-white/20 hover:bg-white/5 text-white font-bold py-4 px-8 rounded-full transition-all text-lg">
                                View Size Guide
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-800">
                            <div className="grid grid-cols-2 gap-6 text-sm text-gray-400">
                                <div>
                                    <h4 className="font-bold text-white mb-2">Details</h4>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>Premium Materials</li>
                                        <li>Handcrafted Finish</li>
                                        <li>Sustainable Production</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Shipping</h4>
                                    <p>Free worldwide shipping on all orders over $200. Returns accepted within 30 days.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
