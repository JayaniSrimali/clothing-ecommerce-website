'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const params = useParams();
    const token = params.token;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Invalid or expired token');
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
                    <h2 className="text-3xl font-serif text-primary mb-2">Reset Password</h2>
                    <p className="text-gray-500">Create a strong new password for your account.</p>
                </div>

                {message && (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm mb-6 border border-emerald-100">
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
                        <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-widest text-[10px]">New Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-sm"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-widest text-[10px]">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 outline-none transition-all font-medium text-sm"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:shadow-2xl hover:translate-y-[-2px] transition-all disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Reset Password'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
