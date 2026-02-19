'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, token } = useAuth();
    const router = useRouter();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Stripe');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const orderData = {
                orderItems: cart.map(item => ({
                    product: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                })),
                shippingAddress: { address, city, postalCode, country },
                paymentMethod,
                itemsPrice: cartTotal,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: cartTotal,
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);

            clearCart();
            router.push('/order-success');
        } catch (error) {
            console.error(error);
            alert('Failed to place order');
        } finally {
            setIsProcessing(false);
        }
    };

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 pb-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                        <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Shipping Address</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                                <input
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                            <input
                                type="text"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2 mt-8">Payment Method</h2>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-all flex-1">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-purple-500 w-5 h-5"
                                />
                                <span className="font-medium">Credit Card (Stripe)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-all flex-1">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-purple-500 w-5 h-5"
                                />
                                <span className="font-medium">PayPal</span>
                            </label>
                        </div>

                        <div className="border-t border-gray-800 pt-6 mt-8">
                            <div className="flex justify-between text-xl font-bold mb-6">
                                <span>Total Amount</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
