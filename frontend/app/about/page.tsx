'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop"
                        alt="Our Story"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <p className="text-xl font-light tracking-wide max-w-2xl mx-auto">
                        Weaving sustainability with timeless elegance since 2026.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 space-y-20 text-primary">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-serif mb-6">The AURA Philosophy</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        At AURA, we believe that fashion should be a harmonious blend of style, comfort, and conscience.
                        Born from a desire to redefine luxury, we curate collections that honor traditional craftsmanship
                        while embracing modern innovation. Every piece tells a story of dedication, quality, and an unyielding
                        commitment to our planet.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1529397394783-69be338fbdf5?q=80&w=1000"
                        alt="Sustainability"
                        className="w-full h-96 object-cover rounded-sm shadow-xl"
                    />
                    <div>
                        <h3 className="text-2xl font-serif mb-4">Sustainable Future</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We are committed to reducing our environmental footprint. From sourcing organic cotton to
                            minimizing waste in our production lines, every decision is made with the earth in mind.
                            Our packaging is 100% recyclable, and we partner with ethical factories that ensure fair wages
                            and safe working conditions.
                        </p>
                    </div>
                </div>

                <div className="bg-cream p-12 text-center rounded-sm border border-primary/10">
                    <h3 className="text-2xl font-serif mb-4">Join Our Journey</h3>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Be a part of a movement that values quality over quantity. Experience the difference of
                        mindful fashion.
                    </p>
                </div>
            </div>
        </div>
    );
}
