"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiX,
  FiChevronDown,
  FiStar,
} from "react-icons/fi";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isInStock: boolean;
  isInCart: boolean;
};

export default function WishlistPage() {
  const [sortBy, setSortBy] = useState<"recent" | "price-low" | "price-high">(
    "recent"
  );
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      originalPrice: 299.99,
      image: "/image/products/img-1.jpg",
      rating: 4.8,
      isInStock: true,
      isInCart: false,
    },
    {
      id: "prod-2",
      name: "Smart Watch Pro",
      price: 199.99,
      image: "/image/products/img-1.jpg",
      rating: 4.5,
      isInStock: true,
      isInCart: true,
    },
    {
      id: "prod-3",
      name: "Premium Leather Backpack",
      price: 129.99,
      originalPrice: 159.99,
      image: "/image/products/img-1.jpg",
      rating: 4.7,
      isInStock: false,
      isInCart: false,
    },
  ]);

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const toggleCartStatus = (productId: string) => {
    setWishlist(
      wishlist.map((item) =>
        item.id === productId ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // recent added stays in original order
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
            <p className="text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <span>
                  Sort:{" "}
                  {sortBy === "recent"
                    ? "Recently Added"
                    : sortBy === "price-low"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border border-gray-200"
                    onClick={() => setShowSortDropdown(false)}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => setSortBy("recent")}
                        className={`w-full text-left px-4 py-2 ${
                          sortBy === "recent"
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Recently Added
                      </button>
                      <button
                        onClick={() => setSortBy("price-low")}
                        className={`w-full text-left px-4 py-2 ${
                          sortBy === "price-low"
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Price: Low to High
                      </button>
                      <button
                        onClick={() => setSortBy("price-high")}
                        className={`w-full text-left px-4 py-2 ${
                          sortBy === "price-high"
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        Price: High to Low
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <FiShare2 />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Wishlist Products */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FiHeart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Save your favorite items here for later
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedWishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden group relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove from wishlist"
                >
                  <FiX className="text-gray-700" />
                </button>

                {/* Product image */}
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          } w-4 h-4`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Stock status and action button */}
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        product.isInStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.isInStock ? "In Stock" : "Out of Stock"}
                    </span>

                    <button
                      onClick={() => toggleCartStatus(product.id)}
                      disabled={!product.isInStock}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${
                        product.isInCart
                          ? "bg-green-100 text-green-800"
                          : product.isInStock
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FiShoppingCart size={16} />
                      <span>{product.isInCart ? "Added" : "Add"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowShareModal(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-md z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Share Your Wishlist</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 rounded-full hover:bg-gray-50"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Link
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={`https://yourstore.com/wishlist/demo-user`} // Replace with actual user ID
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://yourstore.com/wishlist/demo-user`
                        );
                        // Add toast notification
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Via
                  </label>
                  <div className="flex gap-3">
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                      {/* Facebook icon */}
                    </button>
                    <button className="p-2 bg-blue-100 text-blue-400 rounded-full hover:bg-blue-200">
                      {/* Twitter icon */}
                    </button>
                    <button className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200">
                      {/* Pinterest icon */}
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                      {/* Email icon */}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
