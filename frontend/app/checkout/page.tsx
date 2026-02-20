'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    CreditCard, MapPin, Truck, Check, ChevronRight,
    ShieldCheck, AlertCircle, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

// Steps for the checkout process
const steps = [
    { id: 1, label: 'Shipping', icon: MapPin },
    { id: 2, label: 'Payment', icon: CreditCard },
    { id: 3, label: 'Review', icon: Check } // Implicit final step before submit
];

export default function CheckoutPage() {
    const { cart, clearCart, cartTotal } = useCart();
    const { user, token } = useAuth();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Credit Card'
    });

    // Update form when user data loads
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ')[1] || '',
                email: user.email || ''
            }));
        } else {
            // Redirect if not logged in
            router.push('/login?redirect=checkout');
        }
    }, [user, router]);

    // Derived values
    const shippingCost = cartTotal > 15000 ? 0 : 450;
    const tax = 0; // Simplified
    const grandTotal = cartTotal + shippingCost + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(prev => prev + 1);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    product: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: cartTotal,
                shippingPrice: shippingCost,
                taxPrice: tax,
                totalPrice: grandTotal
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);

            // Success!
            clearCart();
            toast.success('Order placed successfully!');
            router.push(`/order-success?orderId=${data._id}`);

        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB] px-4">
                <h2 className="text-3xl font-serif font-bold text-[#3E2723] mb-4">Your bag is empty</h2>
                <p className="text-gray-500 mb-8">Add distinct pieces to your collection before checking out.</p>
                <Link href="/shop" className="px-8 py-3 bg-[#3E2723] text-white rounded-xl font-bold hover:bg-[#2D1B18] transition-all shadow-lg">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FDFCFB] min-h-screen pt-28 pb-12 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-3">Secure Checkout</h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                        <ShieldCheck size={16} /> 256-bit SSL Encrypted
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN - STEPS */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Stepper Visual */}
                        <div className="flex items-center justify-between px-4 md:px-12 mb-8 relative">
                            {/* Track Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2" />

                            {steps.slice(0, 2).map((step) => {
                                const isActive = currentStep >= step.id;
                                const isCurrent = currentStep === step.id;
                                return (
                                    <div key={step.id} className="relative z-0 flex flex-col items-center gap-2 bg-[#FDFCFB] px-4">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                backgroundColor: isActive ? '#3E2723' : '#F3F4F6',
                                                scale: isCurrent ? 1.1 : 1
                                            }}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border-4 border-[#FDFCFB] shadow-sm`}
                                        >
                                            <step.icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                                        </motion.div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[#3E2723]' : 'text-gray-400'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Step Content */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">

                            <AnimatePresence mode="wait">
                                {/* STEP 1: SHIPPING */}
                                {currentStep === 1 && (
                                    <motion.form
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleNextStep}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-serif font-bold text-[#3E2723] mb-6 flex items-center gap-2">
                                            <MapPin className="text-[#F5C255]" /> Shipping Details
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                                                <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="john@example.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Street Address</label>
                                            <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="123 Fashion Ave, Apt 4B" />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                                                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="Colombo" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Postal Code</label>
                                                <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="10100" />
                                            </div>
                                            <div className="space-y-2 col-span-2 md:col-span-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Country</label>
                                                <input required type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none transition-all placeholder:text-gray-300" placeholder="Sri Lanka" />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                                            <button type="submit" className="bg-[#3E2723] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D1B18] transition-all flex items-center gap-2 shadow-lg">
                                                Next: Payment <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </motion.form>
                                )}

                                {/* STEP 2: PAYMENT */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-serif font-bold text-[#3E2723] mb-6 flex items-center gap-2">
                                            <CreditCard className="text-[#F5C255]" /> Payment Method
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {['Credit Card', 'PayPal'].map((method) => (
                                                <div
                                                    key={method}
                                                    onClick={() => setFormData(p => ({ ...p, paymentMethod: method }))}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${formData.paymentMethod === method
                                                            ? 'border-[#3E2723] bg-[#3E2723]/5'
                                                            : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method ? 'border-[#3E2723]' : 'border-gray-300'
                                                        }`}>
                                                        {formData.paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-[#3E2723]" />}
                                                    </div>
                                                    <span className="font-bold text-gray-800">{method}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {formData.paymentMethod === 'Credit Card' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-4 space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card Number</label>
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                        <input type="text" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none font-mono text-sm" placeholder="0000 0000 0000 0000" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Expiry</label>
                                                        <input type="text" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none font-mono text-sm" placeholder="MM/YY" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CVC</label>
                                                        <input type="text" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-[#3E2723] outline-none font-mono text-sm" placeholder="123" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                            <button
                                                onClick={() => setCurrentStep(1)}
                                                className="text-gray-500 font-bold hover:text-[#3E2723] transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handlePlaceOrder}
                                                disabled={loading}
                                                className="bg-[#3E2723] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D1B18] transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                                    <>Confirm Order (${grandTotal.toLocaleString()})</>
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <h3 className="text-xl font-serif font-bold text-[#3E2723] mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-[#3E2723]">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">
                                        {shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Tax</span>
                                    <span className="font-medium text-gray-900">Rs. {tax.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-end">
                                <span className="font-bold text-gray-900">Total to Pay</span>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-[#3E2723]">Rs. {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg mt-6 flex gap-2">
                                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                <p>By placing this order, you agree to our Terms of Service and Return Policy.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
