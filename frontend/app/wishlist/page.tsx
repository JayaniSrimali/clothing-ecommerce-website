'use client';

import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Trash2, Heart, Plus } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <Heart className="text-gray-600 mb-6" size={64} />
                <h1 className="text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
                <p className="text-gray-400 mb-8">Save items you love here.</p>
                <Link href="/shop" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 pb-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlist.length})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <div key={product._id} className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 group">
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => addToCart({
                                            id: product._id,
                                            name: product.title,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1
                                        })}
                                        className="bg-white/90 text-black px-4 py-2 rounded-full font-bold hover:bg-white flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                    >
                                        <Plus size={16} /> Add
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-500 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{product.title}</h3>
                                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                                <p className="font-bold text-purple-400">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
