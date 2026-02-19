'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'men',
        stock: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`);
            setFormData({
                title: res.data.title,
                price: res.data.price,
                description: res.data.description,
                category: res.data.category,
                stock: res.data.stock,
                image: res.data.image
            });
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch product details');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock) || 0
            });

            router.push('/admin/products');
        } catch (err: any) {
            setError(err.response?.data?.msg || err.message || 'Failed to update product');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading product details...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/admin/products" className="text-gray-500 hover:text-primary flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100 flex items-center gap-2">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                                placeholder="e.g. Wool Blend Coat"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary shadow-sm"
                            placeholder="Product details..."
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm bg-white"
                            >
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        {formData.image && (
                            <div className="mt-4 w-32 h-32 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} />
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/products')}
                            className="mr-4 px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-primary text-white px-8 py-2 rounded-md font-medium hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
