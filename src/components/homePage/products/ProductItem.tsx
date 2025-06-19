"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import Link from "next/link";
import { CartContext } from "@/store/CartContext";
import { AuthContext } from "@/store/AuthContext";
import { AuthModalContext } from "@/store/AuthModalContext";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
// import StarRating from "@/components/shared/StarRating";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 },
  },
};

type ProductItemProp = {
  product: FrontEndProductCartItem;
  toggleLike: (product: FrontEndProductCartItem) => void;
  likedProducts: number[];
};

const ProductItem: React.FC<ProductItemProp> = ({
  product,
  toggleLike,
  likedProducts,
}) => {
  const { addToCart, isLoadingAddToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [quickViewProduct, setQuickViewProduct] =
    useState<FrontEndProductCartItem | null>(null);

  const { openAuthModal } = useContext(AuthModalContext);

  function handleAddToCart() {
    if (isAuthenticated) {
      addToCart(product.id, 1);
    } else {
      setQuickViewProduct(null);
      openAuthModal();
    }
  }

  return (
    <>
      {/* Product Grid */}
      <motion.div
        key={product.id}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="flex-shrink-0 w-48 xs:w-56 sm:w-52 md:w-56 lg:w-60  xl:w-64 bg-white rounded-xl shadow-sm overflow-hidden relative mb-4 group cursor-pointer"
      >
        {/* Product Image */}
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="relative aspect-square"
        >
          <Image
            src={product.image ?? "/image/products/img.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 360px) 140px, (max-width: 480px) 180px, (max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 256px"
            priority={false}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full">
                NEW
              </span>
            )}
            {product.tags?.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full ${
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
              </motion.span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2 xs:p-3 sm:p-4">
          <h3 className="font-bold text-gray-900 line-clamp-2 text-[14px] sm:text-[16px]">
            {product.name}
          </h3>

          <div className="flex items-center mt-1 xs:mt-2">
            {/* <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  } w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5`}
                />
              ))}
            </div> */}
            {/* <span className="text-[10px] xs:text-xs text-gray-500 ml-0.5 xs:ml-1">
              ({product.rating.toFixed(1)})
            </span> */}
          </div>

          <div className="mt-2 xs:mt-3 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900 text-[14px] sm:text-base">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[14px]  sm:text-base text-red-300 line-through ml-1 xs:ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex gap-1 xs:gap-2 sm:gap-3">
              {/* Like Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(product);
                }}
                className="p-1 xs:p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label={
                  likedProducts.includes(product.id)
                    ? "Unlike product"
                    : "Like product"
                }
              >
                <FiHeart
                  className={`${
                    likedProducts.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  } w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-5 sm:h-5`}
                />
              </motion.button>

              {/* Add to Cart / Out of Stock Button */}
              {product.stock_availability ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 xs:p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors cursor-pointer ${
                    isLoadingAddToCart ? "opacity-40 cursor-wait" : ""
                  }`}
                  aria-label="Add to cart"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  disabled={isLoadingAddToCart}
                >
                  <FiShoppingCart className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-5 sm:h-5 p-[3px]" />
                </motion.button>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors px-1.5 xs:px-2 py-0.5 text-[10px] xs:text-xs"
                  aria-label="This item is currently out of stock"
                >
                  <span>Out of Stock</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-2 xs:p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-xs sm:max-w-md overflow-hidden z-[1001]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Close Button */}
              <div className="relative h-40 sm:h-48 w-full">
                <Image
                  src={product.image ?? "/image/products/img.png"}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Close Button */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition z-10"
                  aria-label="Close quick view"
                >
                  <FiX className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-800" />
                </button>

                {/* Badges */}
                {quickViewProduct.tags && quickViewProduct.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex gap-1 z-10">
                    {quickViewProduct.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 rounded-full ${
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
              <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {quickViewProduct.name}
                  </h2>
                  {/* <StarRating rating={quickViewProduct.rating} /> */}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                {quickViewProduct.short_description && (
                  <p className="text-xs sm:text-sm text-gray-600">
                    {quickViewProduct.short_description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-4">
                  {quickViewProduct.stock_availability ? (
                    <button
                      onClick={handleAddToCart}
                      className="cursor-pointer bg-black text-white py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-800 transition sm:text-sm"
                    >
                      <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> Add
                      to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed bg-gray-200 text-gray-600 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition sm:text-sm"
                      aria-label="This item is currently out of stock"
                    >
                      <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 opacity-50" />
                      <span>Out of Stock</span>
                    </button>
                  )}

                  <Link
                    href={`/product/${quickViewProduct.url_key}`}
                    className="border border-black py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 hover:bg-gray-50 transition sm:text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductItem;
