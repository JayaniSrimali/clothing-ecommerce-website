'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import {
    Star, Minus, Plus, Heart, Share2,
    Facebook, Twitter, Instagram,
    ChevronRight, Check, ArrowLeft, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
    images?: string[];
}

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();

    // Data States
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // UI States
    const [currentImage, setCurrentImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Brown');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('Review');
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Context
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Mock Options with Images (for changing image on color click)
    const colorOptions = [
        { name: 'Brown', hex: '#8D6E63', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036' },
        { name: 'Red', hex: '#D32F2F', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1083' }, // Only for demo effect
        { name: 'Blue', hex: '#1976D2', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000' },
        { name: 'Green', hex: '#388E3C', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000' }
    ];

    const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                setCurrentImage(res.data.image);
                // Check wishlist status
                setIsWishlisted(isInWishlist(res.data._id));
            } catch (err) {
                // Fallback for demo
                const demoProduct = {
                    _id: id as string,
                    title: 'Trendy Brown Coat',
                    price: 75.00,
                    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    category: 'Coats',
                    stock: 12,
                    images: [
                        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036',
                        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300',
                        'https://images.unsplash.com/photo-1529139574466-a302d2052574?q=80&w=300',
                        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300'
                    ]
                };
                setProduct(demoProduct);
                setCurrentImage(demoProduct.image);
                setIsWishlisted(isInWishlist(id as string));
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, isInWishlist]);

    // Handle Color Change
    const handleColorChange = (color: typeof colorOptions[0]) => {
        setSelectedColor(color.name);
        // In a real app, this would check if the color image exists for this specific product
        // For demo, we just swap the main image if it's different
        if (color.name !== 'Brown') {
            setCurrentImage(color.image);
        } else {
            // Reset to original if Brown
            if (product) setCurrentImage(product.image);
        }
    };

    // Handle Wishlist
    const handleWishlistToggle = () => {
        if (!product) return;
        if (isWishlisted) {
            removeFromWishlist(product._id);
            setIsWishlisted(false);
            toast.success('Removed from Wishlist');
        } else {
            addToWishlist(product);
            setIsWishlisted(true);
            toast.success('Added to Wishlist');
        }
    };

    // Handle Buy Now
    const handleBuyNow = () => {
        if (!product) return;
        addToCart({ ...product, quantity, id: product._id, name: product.title, image: currentImage }); // Use current image
        toast.success('Proceeding to Checkout');
        router.push('/checkout'); // Assuming a checkout page exists or will exist
    };

    // Handle Add to Cart
    const handleAddToCart = () => {
        if (!product) return;
        addToCart({ ...product, quantity, id: product._id, name: product.title, image: currentImage });
        toast.success('Added to Cart');
    };

    // Handle Share
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-primary"><Loader2 className="w-10 h-10 animate-spin" /></div>;
    if (!product) return <div className="h-screen flex items-center justify-center text-primary">Product not found</div>;

    return (
        <div className="min-h-screen bg-white text-gray-800 pt-28 pb-12 font-sans relative">
            {/* Toast Notifications */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-12 space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Product Details</h1>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/shop" className="hover:text-primary">Shop</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="capitalize">{product.category}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900 font-medium">Details</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden relative group shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    src={currentImage}
                                    alt={product.title}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Zoom/Overlay Effect on Hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {[product.image, ...(product.images || [])].slice(0, 4).map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setCurrentImage(img)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${currentImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">{product.category}</span>
                            <h2 className="text-4xl font-bold text-gray-900 mt-1 mb-2 font-serif">{product.title}</h2>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 font-medium">(245 Reviews)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                <span className="text-xl text-gray-400 line-through">${(product.price * 1.5).toFixed(2)}</span>
                                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full uppercase">Save 33%</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-base">
                            {product.description}
                        </p>

                        {/* Color Selector */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Color : <span className="font-normal text-gray-600 capitalize">{selectedColor}</span></h3>
                            <div className="flex items-center space-x-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => handleColorChange(color)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-105'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                        {selectedColor === color.name && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-3 w-full md:w-3/4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Size : <span className="font-normal text-gray-600">{selectedSize}</span></h3>
                                <button className="text-xs font-medium text-gray-500 underline hover:text-primary">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center text-sm font-medium border rounded-md transition-all ${selectedSize === size
                                                ? 'bg-primary text-white border-primary shadow-md'
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-8 border-t border-gray-100">
                            <div className="flex items-center border border-gray-200 rounded-md w-max bg-gray-50">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-l-md"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-r-md"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex gap-3 flex-1 h-[50px]">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#3E2723] hover:bg-[#2D1B18] text-white font-bold text-sm tracking-wider uppercase rounded-md transition-all shadow-md active:transform active:scale-95"
                                >
                                    Add To Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-[#F5C255] hover:bg-[#E0B040] text-gray-900 font-bold text-sm tracking-wider uppercase rounded-md transition-all shadow-md active:transform active:scale-95"
                                >
                                    Buy Now
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`px-4 border rounded-md transition-colors flex items-center justify-center ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 hover:border-gray-400 text-gray-600'}`}
                                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-3 text-sm text-gray-500 pt-4">
                            <p className="flex items-center gap-2"><span className="font-bold text-gray-900 w-24">SKU:</span> GHFT95245AAA</p>
                            <p className="flex items-center gap-2"><span className="font-bold text-gray-900 w-24">Availability:</span> <span className="text-green-600 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> In Stock</span></p>
                            <p className="flex items-center gap-2"><span className="font-bold text-gray-900 w-24">Categories:</span> Women, Coat, Fashion</p>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="font-bold text-gray-900 w-24">Share:</span>
                                <div className="flex items-center gap-4">
                                    <button onClick={handleShare} className="hover:text-primary transition-colors p-1 hover:bg-gray-100 rounded-full"><Share2 className="w-4 h-4" /></button>
                                    <button className="hover:text-primary transition-colors p-1 hover:bg-gray-100 rounded-full"><Facebook className="w-4 h-4" /></button>
                                    <button className="hover:text-primary transition-colors p-1 hover:bg-gray-100 rounded-full"><Instagram className="w-4 h-4" /></button>
                                    <button className="hover:text-primary transition-colors p-1 hover:bg-gray-100 rounded-full"><Twitter className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs Section */}
                <div className="mt-24">
                    <div className="flex justify-center border-b border-gray-200 mb-10 overflow-x-auto">
                        {['Description', 'Additional Information', 'Review'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-4 text-base md:text-lg font-medium transition-all relative ${activeTab === tab
                                        ? 'text-gray-900 font-bold'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'Review' && (
                                    <div className="space-y-12">
                                        {/* Rating Summary */}
                                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                                                <div className="text-center md:text-left">
                                                    <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                                                    <div className="flex justify-center md:justify-start text-yellow-400 mb-2">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                                    </div>
                                                    <p className="text-sm text-gray-500">(107 Reviews)</p>
                                                </div>
                                                <div className="col-span-1 md:col-span-3 space-y-2">
                                                    {[5, 4, 3, 2, 1].map((star) => (
                                                        <div key={star} className="flex items-center gap-3">
                                                            <span className="text-xs font-medium text-gray-500 w-12 text-right">{star} Star</span>
                                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-yellow-400 rounded-full"
                                                                    style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Description' && (
                                    <div className="text-gray-600 leading-relaxed space-y-4">
                                        <p>
                                            Experience the perfect blend of style and comfort with our {product.title}.
                                            Meticulously drafted from high-quality materials, this piece is designed to withstand the test of time
                                            while keeping you fashionable. Whether you're heading to a formal event or a casual outing,
                                            this versatility ensures you always look your best.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Premium fabric blend for superior comfort</li>
                                            <li>Modern tailored fit</li>
                                            <li>Durable stitching for long-lasting wear</li>
                                            <li>Easy care instructions</li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'Additional Information' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="font-bold text-gray-900">Weight</span>
                                            <span className="text-gray-600">0.5 kg</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="font-bold text-gray-900">Dimensions</span>
                                            <span className="text-gray-600">60 x 40 x 2 cm</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="font-bold text-gray-900">Materials</span>
                                            <span className="text-gray-600">60% Cotton, 40% Polyester</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="font-bold text-gray-900">Care Instructions</span>
                                            <span className="text-gray-600">Machine wash cold</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}
