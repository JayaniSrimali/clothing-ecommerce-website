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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex justify-center gap-2">
                    <button
                        onClick={() => addToCart({ id: product._id, name: product.title, price: product.price, image: product.image, quantity: 1 })}
                        className="bg-white text-black p-3 rounded-full hover:bg-gray-200 shadow-lg transform active:scale-95 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                    <Link href={`/product/${product._id}`} className="bg-white text-black p-3 rounded-full hover:bg-gray-200 shadow-lg transform active:scale-95 transition-all">
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-400 capitalize">{product.category}</p>
                <p className="text-base font-semibold text-white">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </motion.div>
    );
}
