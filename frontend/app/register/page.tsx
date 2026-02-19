'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Demo registration implementation
        console.log('Registration attempt', { name, email, password });
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-purple-500/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 text-center mb-8">
                    <h1 className="text-3xl font-black mb-2 tracking-tight text-white">
                        Create Account
                    </h1>
                    <p className="text-gray-400">Join the exclusive community</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="space-y-4">
                        <div className="relative group focus-within:ring-2 ring-indigo-500/50 rounded-xl transition-all">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="relative group focus-within:ring-2 ring-purple-500/50 rounded-xl transition-all">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="relative group focus-within:ring-2 ring-pink-500/50 rounded-xl transition-all">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type="password"
                                placeholder="Secure Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>I agree to the <a href="#" className="underline hover:text-white">Terms & Conditions</a></span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Create My Account
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm relative z-10 transition-all hover:text-gray-400">
                    Already have an account? <Link href="/login" className="text-white hover:underline decoration-indigo-500 decoration-2 underline-offset-4">Sign in instead</Link>
                </p>
            </motion.div>
        </div>
    );
}
