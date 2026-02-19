'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqData = [
    {
        category: 'Ordering',
        questions: [
            { q: 'How do I place an order?', a: 'You can place an order directly through our website. Simply select your items, add them to your cart, and proceed to checkout.' },
            { q: 'Can I change my order after placing it?', a: 'We process orders quickly, but if you contact us within 1 hour of placing your order, we may be able to make changes.' },
            { q: 'Do you offer international shipping?', a: 'Yes, we ship to over 50 countries worldwide. Shipping rates and times vary by location.' },
        ]
    },
    {
        category: 'Products',
        questions: [
            { q: 'How do I know my size?', a: 'Please refer to our Size Guide available on each product page. If you are unsure, feel free to contact our customer support.' },
            { q: 'Are your products ethically sourced?', a: 'Absolutely. We prioritize sustainability and ethical labor practices in our entire supply chain.' },
            { q: 'How do I care for my garments?', a: 'Care instructions are provided on the label of each garment. We recommend dry cleaning for wool and delicate items.' },
        ]
    },
    {
        category: 'Returns & Refunds',
        questions: [
            { q: 'What is your return policy?', a: 'We accept returns within 30 days of purchase for items that are unworn and in their original condition with tags attached.' },
            { q: 'How long does a refund take?', a: 'Refunds are processed within 5-7 business days after we receive your return.' },
            { q: 'Do I have to pay for return shipping?', a: 'Return shipping is free for domestic orders. International returns may incur a shipping fee.' },
        ]
    }
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState<string | null>(null);

    const toggleAccordion = (index: string) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-16 text-primary">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif mb-6">Frequently Asked Questions</h1>
                    <p className="text-gray-500 text-lg font-light">
                        Find answers to common questions about our products and services.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {faqData.map((section, catIdx) => (
                        <div key={section.category}>
                            <h2 className="text-2xl font-serif mb-6 border-b border-primary/10 pb-2">{section.category}</h2>
                            <div className="space-y-4">
                                {section.questions.map((item, qIdx) => {
                                    const index = `${catIdx}-${qIdx}`;
                                    const isActive = activeIndex === index;

                                    return (
                                        <div key={index} className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className={`w-full flex justify-between items-center p-6 text-left transition-colors ${isActive ? 'bg-cream text-primary' : 'bg-white hover:bg-gray-50'}`}
                                            >
                                                <span className="font-medium text-lg">{item.q}</span>
                                                {isActive ? <Minus className="w-5 h-5 text-secondary flex-shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                                            </button>
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-cream/30"
                                                    >
                                                        <div className="p-6 border-t border-gray-100 text-gray-600 leading-relaxed">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-cream p-12 rounded-xl border border-primary/5">
                    <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-8">
                        Our support team is here to help you Mon-Fri from 9am to 6pm.
                    </p>
                    <a href="/contact" className="inline-block bg-primary text-white px-8 py-3 font-bold hover:bg-secondary transition-colors shadow-md rounded-full">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
