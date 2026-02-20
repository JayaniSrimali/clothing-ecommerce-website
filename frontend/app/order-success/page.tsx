'use client';

import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'PENDING-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-[#FDFCFB] min-h-screen pt-32 pb-12 flex items-center justify-center font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full mx-4 text-center bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden"
            >
                {/* Confetti / Success Visual */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3E2723] via-[#F5C255] to-[#3E2723]" />

                <div className="flex justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse opacity-50" />
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10">
                        <Check className="w-12 h-12 stroke-[3]" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-4">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                    Thank you for your purchase. We've received your order and are getting it ready for shipment.
                </p>

                <div className="bg-[#3E2723]/5 p-6 rounded-2xl border border-[#3E2723]/10 mb-8 text-left">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Order Reference</span>
                        <Package size={16} className="text-[#3E2723]" />
                    </div>
                    <p className="text-2xl font-mono font-bold text-[#3E2723] tracking-wider break-all">#{orderId}</p>
                    <p className="text-xs text-gray-400 mt-2">A confirmation email has been sent to your inbox.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/profile" className="w-full py-3.5 bg-[#3E2723] text-white font-bold rounded-xl hover:bg-[#2D1B18] transition-all shadow-lg flex items-center justify-center gap-2">
                        View Order Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/shop" className="w-full py-3.5 bg-white border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:text-[#3E2723] transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Continue Shopping
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
