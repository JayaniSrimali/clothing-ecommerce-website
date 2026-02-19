'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 pb-16">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            OUR STORY
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Born from a desire to merge luxury with functionality, Luxe Clothing redefines modern apparel. We believe in quality, sustainability, and timeless design.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
                            alt="Fashion Designer"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white">Crafted with Purpose</h2>
                        <p className="text-gray-400 text-lg">
                            Every piece in our collection is meticulously crafted using ethically sourced materials. We partner with artisans who share our vision for sustainable luxury.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div>
                                <h3 className="text-4xl font-black text-indigo-500 mb-2">100%</h3>
                                <p className="text-gray-500">Sustainable Materials</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-purple-500 mb-2">50k+</h3>
                                <p className="text-gray-500">Happy Customers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 rounded-3xl p-12 text-center border border-gray-800"
                >
                    <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Be the first to know about new collections and exclusive offers.
                    </p>
                    <form className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-6 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
