'use client';

import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
    _id: string; // MongoDB _id
    title: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="group relative bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
        >
            <Link href={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
                <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={product.image}
                    alt={product.title}
                />
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                        {product.category}
                    </span>
                </div>
            </Link>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Link href={`/product/${product._id}`}>
                    <h3 className="text-xl font-bold text-white mb-1 truncate drop-shadow-md">{product.title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                        ${product.price ? product.price.toFixed(2) : '0.00'}
                    </p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart({ id: product._id, name: product.title, price: product.price, image: product.image, quantity: 1 });
                        }}
                        className="bg-white text-black font-bold p-3 rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-lg shadow-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
