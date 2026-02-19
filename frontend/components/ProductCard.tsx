'use client';

import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-gray-800 border border-gray-700 relative group"
        >
            <div className="relative overflow-hidden aspect-square">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={product.image} alt={product.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={() => addToCart({ id: product._id, name: product.title, price: product.price, image: product.image, quantity: 1 })}
                        className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transform scale-90 transition-transform group-hover:scale-100"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white truncate">{product.title}</div>
                <p className="text-gray-400 text-base mb-2 capitalize">{product.category}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </motion.div>
    );
}
