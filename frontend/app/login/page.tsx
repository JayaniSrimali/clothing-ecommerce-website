'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Demo login implementation
        console.log('Login attempt', { email, password });
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                <div className="relative z-10 text-center mb-8">
                    <h1 className="text-3xl font-black mb-2 tracking-tight text-white">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Sign in to access your saved items</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="space-y-4">
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                            <input type="checkbox" className="accent-purple-500 w-4 h-4 rounded border-gray-700 bg-gray-800" />
                            Remember me
                        </label>
                        <a href="#" className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-80 transition-opacity">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-5 h-5" /> Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm relative z-10">
                    Don't have an account? <Link href="/register" className="text-white hover:underline decoration-purple-500 decoration-2 underline-offset-4">Create one now</Link>
                </p>
            </motion.div>
        </div>
    );
}
