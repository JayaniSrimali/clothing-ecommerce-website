'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'card'
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        // Mock order placement
        clearCart();
        window.location.href = '/order-success';
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary">
                <h2 className="text-3xl font-serif mb-4">Your cart is empty</h2>
                <Link href="/shop" className="px-8 py-3 bg-primary text-white hover:bg-secondary transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-12 text-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
                {/* Checkout Form */}
                <div className="space-y-8">
                    <div className="flex items-center space-x-4 mb-8">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                        <h2 className="text-2xl font-serif">Shipping Information</h2>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input type="text" name="firstName" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input type="text" name="lastName" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input type="email" name="email" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input type="text" name="address" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input type="text" name="city" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Postal Code</label>
                                <input type="text" name="postalCode" onChange={handleChange} className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm" required />
                            </div>
                        </div>
                    </form>

                    <div className="flex items-center space-x-4 mb-8 mt-12">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                        <h2 className="text-2xl font-serif">Payment Details</h2>
                    </div>

                    <div className="bg-cream p-6 rounded-sm border border-primary/10">
                        <p className="text-sm text-gray-500 mb-4">Select Payment Method</p>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 p-3 border border-gray-200 bg-white cursor-pointer hover:border-primary transition-colors">
                                <input type="radio" name="payment" className="text-primary focus:ring-primary" defaultChecked />
                                <span className="font-medium">Credit Card</span>
                            </label>
                            <label className="flex items-center space-x-3 p-3 border border-gray-200 bg-white cursor-pointer hover:border-primary transition-colors">
                                <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                                <span className="font-medium">PayPal</span>
                            </label>
                        </div>

                        {/* Mock Card Input */}
                        <div className="mt-6 space-y-4">
                            <input type="text" placeholder="Card Number" className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm bg-white" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm bg-white" />
                                <input type="text" placeholder="CVC" className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 shadow-sm bg-white" />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-primary text-white py-4 font-bold hover:bg-secondary transition-colors shadow-xl mt-8"
                    >
                        Place Order (${total.toFixed(2)})
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-8 h-fit sticky top-24 rounded-sm border border-gray-200">
                    <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-sm overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-primary">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2 text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center font-bold text-xl text-primary">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
