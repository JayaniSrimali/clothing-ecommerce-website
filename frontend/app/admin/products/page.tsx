'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import {
    Edit,
    Trash2,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Package,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    AlertCircle,
    TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    stock: number;
    image: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            toast.error('Failed to fetch products'); // Added toast for fetch error
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                toast.success('Product deleted successfully!'); // Added success toast
            } catch (err) {
                console.error('Error deleting product:', err); // Added console.error for debugging
                toast.error('Failed to delete product'); // Replaced alert with toast.error
            }
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8 pb-12">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-serif text-primary font-bold">Products</h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">Manage your catalog, stock levels, and categories.</p>
                </div>
                <Link
                    href="/admin/products/add"
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-2xl hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Add New Product
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-[30px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, ID or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-[#FDFCFB] border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/5 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-[#FDFCFB] border-none rounded-2xl text-sm font-bold px-6 py-4 focus:ring-2 focus:ring-primary/5 cursor-pointer flex-1 md:flex-none"
                    >
                        <option value="all">All Categories</option>
                        <option value="men">Men's Wear</option>
                        <option value="women">Women's Wear</option>
                        <option value="kids">Kids</option>
                        <option value="accessories">Accessories</option>
                    </select>
                    <button className="p-4 bg-[#FDFCFB] rounded-2xl text-gray-400 hover:text-primary transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FDFCFB] border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Product Info</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Inventory</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Price</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
                                            <p className="text-gray-400 font-medium">Syncing catalog...</p>
                                        </td>
                                    </tr>
                                ) : filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                                <Package size={32} />
                                            </div>
                                            <h3 className="text-lg font-bold text-primary">No products found</h3>
                                            <p className="text-gray-400 text-sm">Try adjusting your filters or add a new item.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product, idx) => (
                                        <motion.tr
                                            key={product._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-[#FDFCFB] group transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                                    </div>
                                                    <div className="max-w-[200px]">
                                                        <p className="font-serif font-black text-primary text-base leading-tight truncate">{product.title}</p>
                                                        <p className="text-[10px] font-mono text-gray-300 mt-1 uppercase">ID: {product._id.substring(18)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-4 py-1.5 bg-secondary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-secondary/20">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1.5 w-32">
                                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                                        <span className={product.stock <= 5 ? 'text-red-500' : 'text-gray-400'}>
                                                            {product.stock <= 5 ? 'Critical Stock' : 'Available'}
                                                        </span>
                                                        <span className="text-primary">{product.stock} items</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                                                            className={`h-full rounded-full ${product.stock <= 5 ? 'bg-red-500' : product.stock <= 15 ? 'bg-orange-400' : 'bg-emerald-500'}`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-xl font-black text-primary tracking-tight">${product.price.toLocaleString()}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Link
                                                        href={`/admin/products/edit/${product._id}`}
                                                        className="p-3 bg-white border border-gray-100 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all"
                                                        title="Edit Product"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-3 bg-white border border-gray-100 rounded-xl text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg transition-all"
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-all">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 bg-[#FDFCFB] border-t border-gray-50 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-primary">{filteredProducts.length}</span> of <span className="text-primary">{products.length}</span> results
                    </p>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary disabled:opacity-30 transition-all shadow-sm" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        {[1, 2, 3].map(page => (
                            <button key={page} className={`w-12 h-12 rounded-xl text-xs font-black transition-all ${page === 1 ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:border-primary/20'}`}>
                                {page}
                            </button>
                        ))}
                        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-all shadow-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Catalog Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary text-white rounded-2xl">
                            <AlertCircle size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-primary">Low Stock Alert</h3>
                    </div>
                    <p className="text-sm text-primary/60 font-medium mb-6">There are 3 items reaching critical stock levels and need re-ordering immediately.</p>
                    <button className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 hover:border-primary transition-all">View Alerts</button>
                </div>
                <div className="bg-secondary/10 p-8 rounded-[40px] border border-secondary/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-secondary text-primary rounded-2xl">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-primary">Price Optimization</h3>
                    </div>
                    <p className="text-sm text-primary/60 font-medium mb-6">Your prices are 5% lower than average market prices. Potential for margin growth detected.</p>
                    <button className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 hover:border-primary transition-all">Analyze Prices</button>
                </div>
                <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex items-center justify-center text-center">
                    <div>
                        <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 text-primary">
                            <ExternalLink size={24} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-primary">Storefront Preview</h3>
                        <p className="text-sm text-gray-400 font-medium mt-1">See how users view your catalog.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
