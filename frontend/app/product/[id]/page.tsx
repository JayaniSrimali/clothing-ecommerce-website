'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../../context/CartContext';
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
                    title: 'Premium Wool Coat',
                    price: 299.99,
                    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036',
                    description: 'Crafted from the finest wool blend, this coat embodies improved durability and timeless style. Features tailored fit, premium lining, and elegant buttons that accentuate the silhouette.',
                    category: 'Jackets',
                    stock: 10
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center text-primary">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center text-primary">Product not found</div>;

    return (
        <div className="min-h-screen bg-white text-primary pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-[3/4] bg-cream rounded-sm overflow-hidden border border-gray-100">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 sticky top-24"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-2">{product.title}</h1>
                            <p className="text-secondary text-lg capitalize font-medium">{product.category}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-medium text-primary">${product.price.toFixed(2)}</span>
                            <div className="flex items-center text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="ml-1 text-gray-500">4.9 (128 reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg font-light">
                            {product.description}
                        </p>

                        {/* Size Selector */}
                        <div>
                            <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wide">Select Size</h3>
                            <div className="flex gap-4">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center font-medium transition-all border ${selectedSize === size
                                            ? 'bg-primary text-white border-primary shadow-lg'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-8 border-t border-gray-100">
                            <button
                                onClick={() => addToCart({ ...product, quantity: 1, id: product._id, name: product.title })}
                                className="flex-1 bg-primary hover:bg-secondary text-white font-medium py-4 px-8 rounded-none transition-all shadow-xl hover:shadow-2xl"
                            >
                                Add to Cart
                            </button>
                            <button className="p-4 bg-white border border-gray-200 hover:border-primary hover:text-primary text-gray-400 transition-colors">
                                <Shield className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4 pt-8">
                            <div className="flex items-center text-gray-500">
                                <Truck className="w-5 h-5 mr-3 text-secondary" />
                                <span>Free shipping on orders over $200</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                                <Check className="w-5 h-5 mr-3 text-green-600" />
                                <span>In stock and ready to ship</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                                <Shield className="w-5 h-5 mr-3 text-blue-600" />
                                <span>30-day return policy</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
