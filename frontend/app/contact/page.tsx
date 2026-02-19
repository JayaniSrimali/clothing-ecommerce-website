'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission, e.g., send data to an API
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const inputClasses = "w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-700 placeholder-gray-400";

    return (
        <div className="bg-white min-h-screen text-gray-800 font-sans pt-24">

            {/* 1. Hero / Header */}
            <div className="text-center py-16 px-6 bg-[#FDFCFB] border-b border-gray-100/50">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif text-primary mb-4"
                >
                    Get in Touch
                </motion.h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Have a question or just want to say hi? We'd love to hear from you.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* 2. Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    <div>
                        <h2 className="text-3xl font-serif text-primary mb-6">Contact Information</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Fill out the form and our team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                                    <p className="text-gray-500 text-sm">(+91) 987 654 3210</p>
                                    <p className="text-gray-500 text-sm">(+91) 123 456 7890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                                    <p className="text-gray-500 text-sm">support@aura.com</p>
                                    <p className="text-gray-500 text-sm">sales@aura.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Office</h4>
                                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                                        123 Fashion Street, <br />
                                        Design District, New York, <br />
                                        NY 10001, USA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Map Placeholder */}
                    <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative group">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                            alt="Map Location"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <span className="bg-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">View Map</span>
                        </div>
                    </div>
                </motion.div>

                {/* 3. Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={inputClasses}
                                placeholder="Order Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                name="message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                className={inputClasses}
                                placeholder="How can we help you today?"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            Send Message
                            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
