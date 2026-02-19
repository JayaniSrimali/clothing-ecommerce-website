'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token, res.data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-serif text-primary mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Sign in to continue your journey.</p>
                    </div>

                    {error && <div className="text-red-500 bg-red-50 p-3 text-sm">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-500">
                                <input type="checkbox" className="mr-2 text-primary focus:ring-primary border-gray-300 rounded" />
                                Remember me
                            </label>
                            <Link href="/forgot-password" title="Forgot password" className="font-medium text-primary hover:text-secondary">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-medium hover:bg-secondary transition-colors shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block w-1/2 relative bg-cream">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
                    alt="Fashion"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                <div className="absolute bottom-12 left-12 text-white">
                    <h3 className="text-4xl font-serif mb-4">Redefining Elegance.</h3>
                    <p className="text-lg text-white/90 max-w-md">Join our community and experience luxury like never before.</p>
                </div>
            </div>
        </div>
    );
}
