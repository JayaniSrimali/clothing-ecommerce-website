'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const [name, setName] = useState('');
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
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            // login(res.data.token, res.data.user); // Don't auto-login
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
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
                            <h1 className="text-3xl font-serif text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-500 text-sm">Join us to unlock exclusive benefits.</p>
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
                                <label className="text-xs font-medium text-gray-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors h-4 w-4" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

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
                                        placeholder="name@example.com"
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
                                        placeholder="Create password"
                                    />
                                </div>
                            </div>

                            <div className="text-[10px] text-gray-500 leading-tight">
                                By signing up, you agree to our <Link href="#" className="font-medium text-primary hover:underline">Terms</Link> and <Link href="#" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
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
                                        Sign Up <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 group">
                                    Sign In
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
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"
                        alt="Register Fashion"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-[20s]"
                    />

                    <div className="absolute bottom-12 left-8 z-20 text-white max-w-sm">
                        <div className="w-8 h-1 bg-white mb-4 rounded-full" />
                        <h2 className="text-3xl font-serif font-medium mb-3 leading-tight">
                            Join the <br />
                            <span className="italic">Revolution.</span>
                        </h2>
                        <p className="text-white/80 text-sm font-light leading-relaxed">
                            Create your account today and step into a world of curated style.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
