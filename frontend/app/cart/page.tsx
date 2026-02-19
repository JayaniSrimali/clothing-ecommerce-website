'use client';

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-4 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">Your Shopping Bag</h1>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center p-12 text-center text-gray-400 bg-gray-900 border border-gray-800 rounded-2xl"
                    >
                        <ShoppingBag className="w-16 h-16 mb-6 opacity-30" />
                        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                        <p className="mb-8 font-light">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            href="/shop"
                            className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                            Start Shopping <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8 space-y-6">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all hover:border-gray-700"
                                    >
                                        <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden shadow-lg shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">Quantity: <span className="text-white font-mono">{item.quantity}</span></p>
                                        </div>

                                        <div className="text-center sm:text-right">
                                            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400 mb-2 font-mono">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm mx-auto sm:mr-0"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={clearCart}
                                    className="text-gray-400 hover:text-white text-sm underline underline-offset-4"
                                >
                                    Clear Shopping Bag
                                </button>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-4 mt-12 lg:mt-0 p-8 bg-gray-900 border border-gray-800 rounded-3xl sticky top-32 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8 text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping Estimate</span>
                                    <span className="font-mono text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="font-mono">$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xl font-bold mb-8 pt-4 border-t border-gray-800">
                                <span>Total</span>
                                <span className="font-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <button className="w-full bg-white text-black font-bold py-4 rounded-full text-lg hover:bg-gray-200 transition-transform active:scale-95 shadow-xl shadow-white/5 flex items-center justify-center gap-2 group">
                                Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Secure checkout powered by Stripe
                            </p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}
