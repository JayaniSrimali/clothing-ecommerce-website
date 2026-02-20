'use client';

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, ChevronRight, ChevronUp, Search, X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    gender?: string;
    colors?: string[];
    isNew?: boolean; // Added for visual flair
}

// Sidebar Accordion Item Component
const FilterSection = ({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
    <div className="border-b border-gray-100 py-4">
        <button
            onClick={onToggle}
            className="flex items-center justify-between w-full group"
        >
            <span className="font-medium text-gray-800 group-hover:text-black transition-colors">{title}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pt-4 space-y-2">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

function ShopContent() {
    const searchParams = useSearchParams();

    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters & Sorting
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState('popularity'); // popularity, price-asc, price-desc, newest
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Mock Data for Categories Structure
    const genderCategories = {
        'Women': ['Jackets', 'Dresses', 'Shirts', 'Tops', 'Sweaters'],
        'Men': ['Hoodies', 'Pants', 'Shoes', 'Jackets', 'T-Shirts'],
        'Kids': ['Jackets', 'Shoes', 'Sets']
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    // Load Data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                if (res.data && res.data.length > 0) setProducts(res.data);
                else throw new Error("No products");
            } catch (err) {
                const demoProducts: Product[] = [
                    { _id: '1', title: 'Wool Blend Coat', price: 299.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036', category: 'Jackets', gender: 'Women', colors: ['#A1887F', '#000'], isNew: true },
                    { _id: '2', title: 'Linen Summer Dress', price: 159.50, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1083', category: 'Dresses', gender: 'Women', colors: ['#F5F5DC'] },
                    { _id: '3', title: 'Cashmere Sweater', price: 89.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000', category: 'Hoodies', gender: 'Men', colors: ['#333'], isNew: true },
                    { _id: '4', title: 'Classic Chinos', price: 79.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000', category: 'Pants', gender: 'Men', colors: ['#D2B48C', '#000'] },
                    { _id: '5', title: 'Silk Blouse', price: 120.00, image: 'https://images.unsplash.com/photo-1517445312882-566f1745d9b3?q=80&w=1000', category: 'Shirts', gender: 'Women', colors: ['#FFF'] },
                    { _id: '6', title: 'Leather Loafers', price: 199.99, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000', category: 'Shoes', gender: 'Men', colors: ['#8D6E63'] },
                    { _id: '7', title: 'Running Sneakers', price: 129.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000', category: 'Shoes', gender: 'Kids', colors: ['#FF0000', '#000'], isNew: true },
                    { _id: '8', title: 'Denim Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000', category: 'Jackets', gender: 'Kids', colors: ['#1E3A8A'] },
                    { _id: '9', title: 'Summer Hat', price: 45.00, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000', category: 'Accessories', gender: 'Women', colors: ['#F5F5DC'] },
                    { _id: '10', title: 'Leather Belt', price: 35.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000', category: 'Accessories', gender: 'Men', colors: ['#3e2723'] },
                    { _id: '11', title: 'Kids T-Shirt', price: 25.00, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000', category: 'T-Shirts', gender: 'Kids', colors: ['#FFC107'] },
                    { _id: '12', title: 'Winter Scarf', price: 40.00, image: 'https://images.unsplash.com/photo-1520903920248-2651036f0194?q=80&w=1000', category: 'Accessories', gender: 'Women', colors: ['#B71C1C'] },
                ];
                setProducts(demoProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const searchQuery = searchParams.get('search');

    // Effect: Filter & Sort Logic
    useEffect(() => {
        let result = [...products];

        // 0. Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // 1. Filter
        if (selectedGender) {
            result = result.filter(p => p.gender === selectedGender);
        }
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // 2. Sort
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); // Put new items first
        }
        // 'popularity' uses default order (or could be random/manual)

        setFilteredProducts(result);
        setCurrentPage(1); // Reset page on filter/sort change
    }, [products, selectedGender, selectedCategories, priceRange, sortBy, searchQuery]);

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-white font-sans pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb & Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-800">Browse Products</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-100 pb-4 gap-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {selectedGender ? `${selectedGender}'s Collection` : 'All Products'}
                            </h1>
                            <p className="text-sm text-gray-400">
                                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results
                            </p>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative z-20">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer min-w-[200px] justify-between"
                            >
                                <span>Sort by: {sortBy === 'price-asc' ? 'Price: Low to High' : sortBy === 'price-desc' ? 'Price: High to Low' : sortBy === 'newest' ? 'Newest Arrivals' : 'Popularity'}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden"
                                    >
                                        {[
                                            { label: 'Popularity', value: 'popularity' },
                                            { label: 'Newest Arrivals', value: 'newest' },
                                            { label: 'Price: Low to High', value: 'price-asc' },
                                            { label: 'Price: High to Low', value: 'price-desc' },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option.value ? 'font-bold text-primary bg-primary/5' : 'text-gray-600'}`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Active Filters Tags */}
                    {(selectedGender || selectedCategories.length > 0) && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-500 mr-2">Applied Filters:</span>
                            {selectedGender && (
                                <button onClick={() => setSelectedGender(null)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200">
                                    {selectedGender} <X className="w-3 h-3" />
                                </button>
                            )}
                            {selectedCategories.map(cat => (
                                <button key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200">
                                    {cat} <X className="w-3 h-3" />
                                </button>
                            ))}
                            <button onClick={() => { setSelectedGender(null); setSelectedCategories([]); }} className="text-xs text-primary underline hover:text-primary/80 ml-2">Clean All</button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT SIDEBAR FILTERS - NOSTRA Style */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-2">

                        {/* Categories Box */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center gap-2 font-bold text-lg mb-6 text-gray-900">
                                <span>Category</span>
                            </div>

                            {/* Gender Accordions with Subcats */}
                            {['Women', 'Men', 'Kids'].map((gender) => (
                                <div key={gender} className="mb-4">
                                    <button
                                        onClick={() => setSelectedGender(prev => prev === gender ? null : gender)}
                                        className={`flex items-center justify-between w-full text-sm font-semibold mb-2 ${selectedGender === gender ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        {gender}
                                        {selectedGender === gender ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>

                                    <AnimatePresence>
                                        {(selectedGender === gender || !selectedGender) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="ml-2 space-y-2 border-l border-gray-100 pl-4 py-1"
                                            >
                                                {(genderCategories as any)[gender].map((cat: string) => (
                                                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-primary border-primary' : 'border-gray-300 bg-white group-hover:border-primary'}`}>
                                                            {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={selectedCategories.includes(cat)}
                                                            onChange={() => {
                                                                if (selectedGender !== gender) setSelectedGender(gender); // Auto select gender
                                                                toggleCategory(cat);
                                                            }}
                                                        />
                                                        <span className="text-sm text-gray-500 group-hover:text-primary transition-colors">{cat}</span>
                                                    </label>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Price Filter Box */}
                        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                            <input
                                type="range"
                                min="0" max="500"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-2"
                            />
                            <div className="flex justify-between font-medium text-sm text-gray-600">
                                <span>$0</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>

                    </aside>

                    {/* RIGHT CONTENT */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse" />)}
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        {/* Products Grid */}
                                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {currentProducts.map((product) => (
                                                <div key={product._id} className="relative group">
                                                    {/* New Badge for New Products */}
                                                    {product.isNew && (
                                                        <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                                            New
                                                        </div>
                                                    )}
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </motion.div>

                                        {/* Pagination Controls */}
                                        {totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-2 pt-8 border-t border-gray-100">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors"
                                                >
                                                    <ArrowLeft className="w-4 h-4" />
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        onClick={() => paginate(i + 1)}
                                                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1
                                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                            : 'text-gray-500 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors"
                                                >
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* PROMO BANNER */}
            <div className="max-w-7xl mx-auto px-6 mt-24">
                <div className="relative rounded-2xl overflow-hidden bg-black text-white h-[400px] flex items-center">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                            alt="Promo"
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                    <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
                        <span className="text-xs font-bold tracking-widest uppercase mb-2 block text-gray-300">Limited Offer</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">35% off only this friday and get special gift</h2>
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                            Grab it now <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* NEWSLETTER */}
            <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
                <h2 className="text-2xl font-bold font-serif mb-2 text-primary">Subscribe to our newsletter to get updates</h2>
                <p className="text-gray-500 mb-8">to our latest collections</p>
                <div className="flex max-w-md mx-auto gap-4">
                    <div className="flex-1 bg-gray-50 rounded-lg flex items-center px-4 border border-gray-200">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <input type="email" placeholder="Enter your email" className="w-full py-3 bg-transparent outline-none text-sm" />
                    </div>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>

        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-t-2 border-primary rounded-full"></div></div>}>
            <ShopContent />
        </Suspense>
    );
}
