'use client';

import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import Link from 'next/link';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542272454315-4c01d7afdf4a?q=80&w=1000';
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions (Slide Up) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={() => addToCart({ id: product._id, name: product.title, price: product.price, image: product.image, quantity: 1 })}
                        className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white shadow-lg transition-colors border border-primary/10"
                        title="Add to Cart"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    <Link
                        href={`/product/${product._id}`}
                        className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white shadow-lg transition-colors border border-primary/10"
                        title="View Details"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-base font-serif text-primary hover:text-secondary transition-colors truncate px-2">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="text-lg font-medium text-primary mt-1">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </motion.div>
    );
}
