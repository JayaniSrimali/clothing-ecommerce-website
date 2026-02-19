'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password reset request
        setTimeout(() => setStatus('success'), 1000);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12 flex items-center justify-center text-primary">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-cream p-10 rounded-sm border border-primary/10 shadow-xl"
            >
                <h1 className="text-3xl font-serif text-center mb-6">Forgot Password?</h1>
                <p className="text-gray-500 text-center mb-8 font-light">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6 border border-green-200">
                            Check your email! We've sent you a reset link.
                        </div>
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 bg-white shadow-sm"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 font-bold hover:bg-secondary transition-colors shadow-md"
                        >
                            Send Reset Link
                        </button>
                        <div className="text-center mt-4">
                            <Link href="/login" className="text-gray-500 hover:text-primary text-sm transition-colors">
                                Remembered your password? Login
                            </Link>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
