'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
    // Generate random order ID
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

    useEffect(() => {
        // Here you would typically fetch order details or clear session if needed
    }, []);

    return (
        <div className="bg-white min-h-screen pt-24 pb-12 text-primary flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto px-4 text-center bg-cream p-12 rounded-xl border border-primary/10 shadow-2xl"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                        <Check className="w-10 h-10" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Order Placed!</h1>
                <p className="text-xl text-gray-500 mb-8 font-light">
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="bg-white p-8 rounded-lg border border-gray-100 mb-8 shadow-sm">
                    <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">Order Number</p>
                    <p className="text-3xl font-bold text-primary tracking-wider font-mono">#{orderId}</p>
                </div>

                <p className="text-gray-600 mb-10 text-sm">
                    An confirmation email has been sent to your inbox. You can track your order status in your profile or using our tracking page.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/shop" className="px-8 py-3 bg-white border border-primary text-primary font-bold hover:bg-cream transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Continue Shopping
                    </Link>
                    <Link href="/track-order" className="px-8 py-3 bg-primary text-white font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2 shadow-md">
                        Track Order <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
