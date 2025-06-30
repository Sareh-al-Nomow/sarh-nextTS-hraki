"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

import ProductItem from "@/components/homePage/products/ProductItem";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<FrontEndProductCartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const wishlistLocal: FrontEndProductCartItem[] = stored
      ? JSON.parse(stored)
      : [];
    if (stored) {
      const wishlistIDS = wishlistLocal.flatMap((p) => p.id);
      setLikedProducts(wishlistIDS);
      setWishlist(wishlistLocal);
    }
  }, []);

  const toggleLike = (product: FrontEndProductCartItem) => {
    const stored = localStorage.getItem("wishlist");
    let wishlist: FrontEndProductCartItem[] = stored ? JSON.parse(stored) : [];

    const exists = wishlist.some((p) => p.id === product.id);

    if (exists) {
      wishlist = wishlist.filter((p) => p.id !== product.id);
    } else {
      wishlist.push(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setLikedProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
    const storedWishList = localStorage.getItem("wishlist");
    const wishlistLocal: FrontEndProductCartItem[] = storedWishList
      ? JSON.parse(storedWishList)
      : [];
    if (storedWishList) {
      const wishlistIDS = wishlistLocal.flatMap((p) => p.id);
      setLikedProducts(wishlistIDS);
      setWishlist(wishlistLocal);
    }
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
