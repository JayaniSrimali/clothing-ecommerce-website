'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4 text-green-500">Order Successful!</h1>
            <p className="text-gray-400 mb-8 text-lg">Thank you for your purchase. We are processing your order.</p>
            <Link href="/" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
}
