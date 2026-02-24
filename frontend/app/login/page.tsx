'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
            toast.success('Successfully logged in!');
            router.push('/');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Invalid email or password';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-4">

            <div className="w-full max-w-5xl h-[85vh] min-h-[600px] flex bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Left Side - Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-12 relative"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    <div className="w-full max-w-sm mx-auto z-10">
                        <div className="mb-6 text-center md:text-left">
                            <Link href="/" className="text-2xl font-black tracking-tighter text-primary mb-6 block">
                                AURA.
                            </Link>
                            <h1 className="text-3xl font-serif text-gray-900 mb-2">Welcome Back</h1>
                            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4 flex items-center gap-2 border border-red-100"
                            >
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-4 w-4" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-700 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-4 w-4" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="w-3.5 h-3.5 border border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                        <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="font-medium text-primary hover:text-secondary underline decoration-transparent hover:decoration-secondary transition-all">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-[#3E2723] transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-4 w-4" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Don't have an account?{' '}
                                <Link href="/register" className="font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 group">
                                    Create one
                                    <ArrowRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hidden md:block w-1/2 h-full relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                        alt="Login Fashion"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-[20s]"
                    />

                    <div className="absolute bottom-12 left-8 z-20 text-white max-w-sm">
                        <div className="w-8 h-1 bg-white mb-4 rounded-full" />
                        <h2 className="text-3xl font-serif font-medium mb-3 leading-tight">
                            Timeless Fashion, <br />
                            <span className="italic">Endless Style.</span>
                        </h2>
                        <p className="text-white/80 text-sm font-light leading-relaxed">
                            Discover a world where elegance meets comfort.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
