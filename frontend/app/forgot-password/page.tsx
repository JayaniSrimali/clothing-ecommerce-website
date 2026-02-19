'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage('A password reset link has been simulated. In a real app, check your email.');
            // For demo purposes, we might show the token or link
            console.log('Reset token:', res.data.resetToken);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-primary mb-2">Forgot Password?</h2>
                    <p className="text-gray-500">Enter your email and we'll help you reset it.</p>
                </div>

                {message && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm mb-6 border border-emerald-100 italic">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-widest text-[10px]">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-sm"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:shadow-2xl hover:translate-y-[-2px] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
