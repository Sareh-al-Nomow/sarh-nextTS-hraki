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
import { useTranslations } from "next-intl";
import { useCurrency } from "@/store/CurrencyContext";

const ProductItem = ({
  product,
  toggleLike,
  likedProducts,
}: {
  product: FrontEndProductCartItem;
  toggleLike: (product: FrontEndProductCartItem) => void;
  likedProducts: number[];
}) => {
  const t = useTranslations("ProductItem");
  const { addToCart, isLoadingAddToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { openAuthModal } = useContext(AuthModalContext);
  const { rate, userCurrency } = useCurrency();

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = likedProducts.includes(product.id);

  const price = (Number(product.price) * rate).toFixed(2);
  const originalPrice = product.originalPrice
    ? (Number(product.originalPrice) * rate).toFixed(2)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      addToCart(product.id, 1);
    } else {
      openAuthModal();
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HOT":
        return "from-red-500 to-orange-500";
      case "BESTSELLER":
        return "from-purple-500 to-pink-500";
      case "NEW":
        return "from-blue-500 to-cyan-500";
      case "SALE":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-500";
    }
  };

  return (
    <>
      {/* Product Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Link
            href={`/product/${product.url_key}`}
            className="absolute inset-0 z-10"
            aria-label={product.name}
          />

          <Image
            src={product.image ?? "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            priority={false}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-2 z-20">
            {product.isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                new
              </span>
            )}
            {product.tags?.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-1 rounded-full font-medium shadow-sm bg-gradient-to-r ${getTagColor(
                  tag
                )} text-white`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quick View Button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={(e) => {
                  e.preventDefault();
                  setQuickViewOpen(true);
                }}
                className="absolute bottom-3 left-0 right-0 mx-auto w-max px-4 py-2 bg-black/90 text-white text-sm rounded-full shadow-md z-20 flex items-center gap-2 backdrop-blur-sm"
              >
                {t("quickShop")}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="p-3 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <Link href={`/product/${product.url_key}`} className="group">
              <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                toggleLike(product);
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition"
              whileTap={{ scale: 0.8 }}
              aria-label={
                isLiked ? t("ariaLabels.unlike") : t("ariaLabels.like")
              }
            >
              <FiHeart
                className={`w-4 h-4 ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              />
            </motion.button>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <div>
              <span className="block font-bold text-gray-900">
                {userCurrency} {price}
              </span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {userCurrency} {originalPrice}
                </span>
              )}
            </div>

            {product.stock_availability ? (
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.9 }}
                className={`p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all ${
                  isLoadingAddToCart ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoadingAddToCart}
                aria-label={t("ariaLabels.addToCart")}
              >
                <FiShoppingCart className="w-4 h-4" />
              </motion.button>
            ) : (
              <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-100">
                {t("outOfStock")}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.image ?? "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  onClick={() => setQuickViewOpen(false)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm z-10"
                  aria-label={t("ariaLabels.close")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <h2 className="font-bold text-lg text-gray-900">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    {userCurrency} {price}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {userCurrency} {originalPrice}
                    </span>
                  )}
                </div>

                {product.short_description && (
                  <p className="text-sm text-gray-600">
                    {product.short_description}
                  </p>
                )}

                <div className="flex gap-3 pt-3">
                  {product.stock_availability ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      {t("addToCart")}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-2 rounded cursor-not-allowed"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      {t("outOfStock")}
                    </button>
                  )}

                  <Link
                    href={`/product/${product.url_key}`}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-50 transition"
                    onClick={() => setQuickViewOpen(false)}
                  >
                    {t("viewDetails")}
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
