'use client';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/shop" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                                <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-purple-400 font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-2 py-1">
                                            {/* Note: logic to decrease quantity is not fully exposed in context in this simplified version, using add for increase only */}
                                            <button className="p-1 hover:text-white text-gray-400"><Minus className="w-4 h-4" /></button>
                                            <span className="text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="p-1 hover:text-white text-gray-400"><Plus className="w-4 h-4" /></button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-400 p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="border-t border-gray-800 pt-4 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/20"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
