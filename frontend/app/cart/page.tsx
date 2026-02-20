'use client';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { cart, removeFromCart, addToCart, cartTotal } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const handleCheckout = () => {
        if (!user) {
            router.push('/login?redirect=checkout');
        } else {
            router.push('/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-[#3E2723]/5 rounded-full flex items-center justify-center mb-6"
                >
                    <ShoppingBag className="text-[#3E2723]/40 w-10 h-10" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-3">Your Bag is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any elegant pieces to your collection yet.</p>
                <Link href="/shop" className="group flex items-center gap-2 bg-[#3E2723] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2D1B18] transition-all shadow-lg hover:shadow-xl hover:shadow-[#3E2723]/20">
                    Start Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-28 pb-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-8 md:mb-12">Shopping Bag <span className="text-lg font-sans font-normal text-gray-500 ml-2">({cart.length} items)</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                            >
                                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-gray-500 text-sm">Size: M | Color: Brown</p> {/* Placeholder for variant checks */}
                                        </div>
                                        <p className="text-[#3E2723] font-bold text-lg">Rs. {item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100">
                                            <button
                                                className="p-1 hover:text-[#3E2723] text-gray-400 disabled:opacity-30 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="p-1 hover:text-[#3E2723] text-gray-400 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                        >
                                            <Trash2 className="w-4 h-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <h2 className="text-xl font-serif font-bold text-[#3E2723] mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Shipping Estimate</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Tax</span>
                                    <span className="font-medium text-gray-900">Rs. 0.00</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-[#3E2723]">Rs. {cartTotal.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-400 font-normal">Including VAT</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-[#3E2723] text-white font-bold py-4 rounded-xl hover:bg-[#2D1B18] transition-all shadow-lg hover:shadow-[#3E2723]/20 flex items-center justify-center gap-2"
                            >
                                Checkout Safely <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                                <span className="text-[10px] bg-gray-50 px-2 py-1 rounded border border-gray-100">🔒 Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
