"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import ProductItem from "@/components/homePage/products/ProductItem";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";

// const itemVariants = {
//   hidden: { opacity: 0, x: 20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 10,
//     },
//   },
//   hover: {
//     y: -5,
//     transition: { duration: 0.2 },
//   },
// };

export default function WishlistPage() {
  const [sortBy, setSortBy] = useState<"recent" | "price-low" | "price-high">(
    "recent"
  );
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [wishlist, setWishlist] = useState<FrontEndProductCartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] =
    useState<FrontEndProductCartItem | null>(null);
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

  const sortedWishlist: FrontEndProductCartItem[] = [...wishlist].sort(
    (a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return 0; // recent added stays in original order
    }
  );

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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {sortedWishlist.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
              />
              // <motion.div
              //   key={product.id}
              //   variants={itemVariants}
              //   initial="hidden"
              //   animate="visible"
              //   whileHover="hover"
              //   className="flex-shrink-0 w-48 md:w-64 bg-white rounded-xl shadow-sm overflow-hidden relative group cursor-pointer"
              // >
              //   {/* Product Image */}
              //   <div
              //     onClick={(e) => {
              //       e.preventDefault();
              //       e.stopPropagation();
              //       setQuickViewProduct(product);
              //     }}
              //     className="relative aspect-square"
              //   >
              //     <Image
              //       src={"/image/products/img-1.jpg"}
              //       alt={product.name}
              //       fill
              //       className="object-cover transition-transform duration-500 group-hover:scale-105"
              //       sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              //     />

              //     {/* Badges */}
              //     <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
              //       {product.isNew && (
              //         <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
              //           NEW
              //         </span>
              //       )}
              //       {product.tags?.map((tag, i) => (
              //         <motion.span
              //           key={i}
              //           initial={{ scale: 0 }}
              //           animate={{ scale: 1 }}
              //           transition={{ delay: i * 0.1 }}
              //           className={`text-xs px-2 py-1 rounded-full ${
              //             tag === "HOT"
              //               ? "bg-red-500"
              //               : tag === "BESTSELLER"
              //               ? "bg-purple-500"
              //               : tag === "NEW"
              //               ? "bg-blue-500"
              //               : "bg-green-500"
              //           } text-white`}
              //         >
              //           {tag}
              //         </motion.span>
              //       ))}
              //     </div>
              //   </div>

              //   {/* Product Info */}
              //   <div className="p-4">
              //     <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
              //       {product.name}
              //     </h3>

              //     <div className="flex items-center mt-2">
              //       <div className="flex">
              //         {[...Array(5)].map((_, i) => (
              //           <FiStar
              //             key={i}
              //             className={`${
              //               i < Math.floor(product.rating)
              //                 ? "text-yellow-400 fill-yellow-400"
              //                 : "text-gray-300"
              //             }`}
              //             size={14}
              //           />
              //         ))}
              //       </div>
              //       <span className="text-xs text-gray-500 ml-1">
              //         ({product.rating.toFixed(1)})
              //       </span>
              //     </div>

              //     <div className="mt-3 flex justify-between items-center">
              //       <div>
              //         <span className="font-bold text-gray-900">
              //           {product.price}
              //         </span>
              //         {product.originalPrice && (
              //           <span className="text-xs text-gray-500 line-through ml-2">
              //             {product.originalPrice}
              //           </span>
              //         )}
              //       </div>

              //       <div className="flex gap-4">
              //         {/* Like Button */}
              //         <motion.button
              //           onClick={(e) => {
              //             e.stopPropagation();
              //             toggleLike(product);
              //           }}
              //           className=" p-2 bg-[#FFF] rounded-full shadow-md hover:bg-gray-100 transition"
              //           whileTap={{ scale: 0.9 }}
              //         >
              //           <FiHeart
              //             className={`${
              //               likedProducts.includes(product.id)
              //                 ? "fill-red-500 text-red-500"
              //                 : "text-gray-700"
              //             }`}
              //           />
              //         </motion.button>
              //         <motion.button
              //           whileTap={{ scale: 0.9 }}
              //           className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
              //           aria-label="Add to cart"
              //         >
              //           <FiShoppingCart size={16} />
              //         </motion.button>
              //       </div>
              //     </div>
              //   </div>
              // </motion.div>
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

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md overflow-hidden z-[1001]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Close Button */}
              <div className="relative h-48 w-full">
                <Image
                  src={"/image/products/img-1.jpg"}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Close Button */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
                  aria-label="Close quick view"
                >
                  <FiX size={18} className="text-gray-800" />
                </button>

                {/* Badges */}
                {quickViewProduct.tags && quickViewProduct.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-1 z-10">
                    {quickViewProduct.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          tag === "HOT"
                            ? "bg-red-500"
                            : tag === "BESTSELLER"
                            ? "bg-purple-500"
                            : tag === "NEW"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        } text-white`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{quickViewProduct.name}</h2>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <FiStar className="text-yellow-400 mr-1" size={14} />
                    <span className="text-sm">{quickViewProduct.rating}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    {quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                {quickViewProduct.description && (
                  <p className="text-gray-600">
                    {quickViewProduct.description}
                  </p>
                )}

                {/* Features */}
                {quickViewProduct.features && (
                  <ul className="space-y-1">
                    {quickViewProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Color Options */}
                {quickViewProduct.colors && (
                  <div>
                    <h3 className="font-medium mb-1">Colors:</h3>
                    <div className="flex gap-2">
                      {quickViewProduct.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className=" cursor-pointer bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <Link
                    href={`/product/${quickViewProduct.name}`}
                    className="border border-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
