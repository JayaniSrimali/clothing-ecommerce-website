'use client';

import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Trash2, Heart, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6"
                >
                    <Heart className="text-red-400 w-10 h-10 fill-red-400/20" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-3">Your Wishlist is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">Save your favorite pieces here to shop them later.</p>
                <Link href="/shop" className="group flex items-center gap-2 bg-[#F5C255] text-[#3E2723] px-8 py-4 rounded-xl font-bold hover:bg-[#E0B04A] transition-all shadow-lg hover:shadow-xl hover:shadow-[#F5C255]/20">
                    Start Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-28 pb-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-8 md:mb-12">My Wishlist <span className="text-lg font-sans font-normal text-gray-500 ml-2">({wishlist.length} saved)</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {wishlist.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group relative"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#3E2723]/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Hover Actions */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                                    <button
                                        onClick={() => addToCart({
                                            id: product._id,
                                            name: product.title,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1
                                        })}
                                        className="w-full bg-white text-[#3E2723] py-3 rounded-xl font-bold shadow-lg hover:bg-[#F5C255] hover:text-[#3E2723] transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        <ShoppingBag size={16} /> Add to Bag
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromWishlist(product._id)}
                                    className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-red-400 hover:bg-white hover:text-red-500 shadow-sm transition-colors z-10 opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="mb-2">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{product.category}</p>
                                    <h3 className="font-serif font-bold text-lg text-[#3E2723] leading-tight line-clamp-1 group-hover:text-[#F5C255] transition-colors">{product.title}</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-gray-900">Rs. {product.price.toLocaleString()}</p>
                                    <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                        In Stock
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
