'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12 text-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">Contact Us</h1>
                    <p className="text-gray-500 max-w-xl mx-auto font-light">
                        We'd love to hear from you. Visit our boutique or get in touch below.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-serif mb-6">Our Location</h2>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-1 text-secondary" />
                                    <p>123 Fashion Avenue, Suite 400<br />Colombo 7, Sri Lanka 00700</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-secondary" />
                                    <p>+94 11 123 4567</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-secondary" />
                                    <p>hello@aura-fashion.com</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 mt-1 text-secondary" />
                                    <p>Mon - Fri: 9am - 8pm<br />Sat - Sun: 10am - 6pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-80 bg-gray-100 rounded-sm relative overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000"
                                alt="Map"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/10 transition-colors pointer-events-none" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-cream p-10 rounded-sm shadow-xl border border-primary/5">
                        <h2 className="text-2xl font-serif mb-8">Send a Message</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 bg-white shadow-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 bg-white shadow-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 focus:border-primary focus:ring-primary h-12 px-4 bg-white shadow-sm"
                                    placeholder="Inquiry about..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                                <textarea
                                    className="w-full border-gray-300 focus:border-primary focus:ring-primary p-4 bg-white shadow-sm h-32"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button className="w-full bg-primary text-white py-4 font-bold hover:bg-secondary transition-colors shadow-md">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
