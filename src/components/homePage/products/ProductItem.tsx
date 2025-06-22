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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 150,
    },
  }),
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
  const t = useTranslations("ProductItem");
  const { addToCart, isLoadingAddToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { openAuthModal } = useContext(AuthModalContext);

  const [quickViewProduct, setQuickViewProduct] =
    useState<FrontEndProductCartItem | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const { rate, userCurrency } = useCurrency();

  function converPrice(price: number) {
    return price * rate;
  }

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
      {/* Product Card */}
      <motion.div
        key={product.id}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className="flex-shrink-0 w-full max-w-[200px] bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden relative mb-4 cursor-pointer transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col h-full"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square overflow-hidden flex-1">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="relative w-full h-full"
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
            <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
              {product.isNew && (
                <motion.span
                  variants={badgeVariants}
                  custom={0}
                  className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium"
                >
                  {t("badges.new")}
                </motion.span>
              )}
              {product.tags?.map((tag, i) => (
                <motion.span
                  key={i}
                  variants={badgeVariants}
                  custom={i + 1}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    tag === "HOT"
                      ? "bg-gradient-to-r from-red-500 to-orange-500"
                      : tag === "BESTSELLER"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : tag === "NEW"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  } text-white shadow-sm`}
                >
                  {t(`badges.${tag.toLowerCase()}`)}
                </motion.span>
              ))}
            </div>

            {/* Quick Shop Button (appears on hover) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                isHovering ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-0 right-0 flex justify-center"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-800 transition-all"
              >
                {t("quickShop")}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-gray-900 text-base leading-tight min-h-[3.5rem] line-clamp-2">
              {product.name}
            </h3>

            {/* Like Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(product);
              }}
              className="p-1 flex-shrink-0"
              whileTap={{ scale: 0.9 }}
              aria-label={
                likedProducts.includes(product.id)
                  ? t("ariaLabels.unlike")
                  : t("ariaLabels.like")
              }
            >
              <FiHeart
                className={`${
                  likedProducts.includes(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                } w-5 h-5 transition-colors`}
              />
            </motion.button>
          </div>

          <div className="mt-3 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg">
                {userCurrency} {converPrice(Number(product.price)).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {userCurrency}{" "}
                  {converPrice(Number(product.originalPrice)).toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            {product.stock_availability ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-all ${
                  isLoadingAddToCart ? "opacity-70 cursor-wait" : ""
                }`}
                aria-label={t("ariaLabels.addToCart")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart();
                }}
                disabled={isLoadingAddToCart}
              >
                <FiShoppingCart className="w-4 h-4" />
              </motion.button>
            ) : (
              <span className="text-xs text-gray-500">{t("outOfStock")}</span>
            )}
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
            className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-xl w-full max-w-md overflow-hidden z-[1001] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative h-64 w-full">
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
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition z-10"
                  aria-label={t("ariaLabels.close")}
                >
                  <FiX className="w-4 h-4 text-gray-800" />
                </button>

                {/* Badges */}
                {quickViewProduct.tags && quickViewProduct.tags.length > 0 && (
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {quickViewProduct.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          tag === "HOT"
                            ? "bg-red-500"
                            : tag === "BESTSELLER"
                            ? "bg-purple-500"
                            : tag === "NEW"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        } text-white shadow-sm`}
                      >
                        {t(`badges.${tag.toLowerCase()}`)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {quickViewProduct.name}
                </h2>

                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900">
                    {userCurrency}{" "}
                    {converPrice(Number(quickViewProduct.price)).toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {userCurrency}{" "}
                      {converPrice(
                        Number(quickViewProduct.originalPrice)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                {quickViewProduct.short_description && (
                  <p className="text-sm text-gray-600">
                    {quickViewProduct.short_description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  {quickViewProduct.stock_availability ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-medium"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      {t("addToCart")}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed bg-gray-100 text-gray-400 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      {t("outOfStock")}
                    </button>
                  )}

                  <Link
                    href={`/product/${quickViewProduct.url_key}`}
                    className="border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition font-medium"
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
