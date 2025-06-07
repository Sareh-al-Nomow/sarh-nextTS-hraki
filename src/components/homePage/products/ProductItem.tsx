"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiStar, FiX } from "react-icons/fi";
import Link from "next/link";
import { FrontendProduct } from "@/models/forntEndProduct";

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
  product: FrontendProduct;
};

const ProductItem: React.FC<ProductItemProp> = ({ product }) => {
  const [quickViewProduct, setQuickViewProduct] =
    useState<FrontendProduct | null>(null);

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  return (
    <>
      {/* Product Grid */}

      <motion.div
        key={product.id}
        variants={itemVariants}
        whileHover="hover"
        className="bg-white rounded-2xl shadow-sm overflow-hidden relative group"
      >
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={"/image/products/img-1.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            priority={product.id <= 4}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
            {product.isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.tags?.map((tag: string, i: number) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`text-xs px-2 py-1 rounded-full ${
                  tag === "SALE"
                    ? "bg-red-500"
                    : tag === "OUT OF STOCK"
                    ? "bg-gray-500"
                    : "bg-blue-500"
                } text-white`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
            {product.name}
          </h3>

          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i: number) => (
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
              <span className="font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-2">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                // Add to cart logic
              }}
              disabled={!product.inventory?.stock_availability}
            >
              <FiShoppingCart size={16} />
            </motion.button>
          </div>
        </div>

        {/* Quick View Trigger */}
        <button
          onClick={(): void => {
            setQuickViewProduct(product);
          }}
          className="absolute inset-0 z-10"
          aria-label={`Quick view ${product.name}`}
        />
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
    </>
  );
};

export default ProductItem;
