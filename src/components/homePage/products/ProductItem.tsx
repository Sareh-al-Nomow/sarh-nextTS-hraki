"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar, FiX } from "react-icons/fi";
import Link from "next/link";
import { CartContext } from "@/store/CartContext";
import { AuthContext } from "@/store/AuthContext";
import { AuthModalContext } from "@/store/AuthModalContext";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
import StarRating from "@/components/shared/StarRating";

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
        className="flex-shrink-0 w-48 md:w-60 lg:w-64 bg-white rounded-xl shadow-sm overflow-hidden relative mb-5 group cursor-pointer"
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
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
            {product.isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.tags?.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`text-xs px-2 py-1 rounded-full ${
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
        <div className="p-4">
          <h3 className="font-bold text-gray-900 line-clamp-2 text-sm md:text-base">
            {product.name}
          </h3>

          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  size={14}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex gap-4">
              {/* Like Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(product);
                }}
                className=" p-2 bg-[#FFF] rounded-full shadow-md hover:bg-gray-100 transition"
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart
                  className={`${
                    likedProducts.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }`}
                />
              </motion.button>
              {product.stock_availability ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition cursor-pointer ${
                    isLoadingAddToCart ? "opacity-40" : ""
                  }`}
                  aria-label="Add to cart"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  disabled={isLoadingAddToCart}
                >
                  <FiShoppingCart size={16} />
                </motion.button>
              ) : (
                <button
                  disabled
                  className="cursor-not-allowed bg-gray-200 text-gray-600 py-1 px-2 rounded-lg flex items-center justify-center transition"
                  aria-label="This item is currently out of stock"
                >
                  {/* <FiShoppingCart className="opacity-50" /> */}
                  <span className="flex items-center text-[12px] sm:text-sm">
                    Out of Stock
                  </span>
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
                  src={product.image}
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
                  <StarRating rating={quickViewProduct.rating} />
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                {quickViewProduct.short_description && (
                  <p className="text-gray-600">
                    {quickViewProduct.short_description}
                  </p>
                )}

                {/* Features
                {quickViewProduct.features && (
                  <ul className="space-y-1">
                    {quickViewProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )} */}

                {/* Color Options */}
                {/* {quickViewProduct.colors && (
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
                )} */}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {quickViewProduct.stock_availability ? (
                    <button
                      onClick={handleAddToCart}
                      className=" cursor-pointer bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed bg-gray-200 text-gray-600 py-3 rounded-lg flex items-center justify-center gap-2 transition"
                      aria-label="This item is currently out of stock"
                    >
                      <FiShoppingCart className="opacity-50" />
                      <span className="flex items-center gap-1">
                        Out of Stock
                      </span>
                    </button>
                  )}

                  <Link
                    href={`/product/${quickViewProduct.url_key}`}
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
    </>
  );
};

export default ProductItem;
