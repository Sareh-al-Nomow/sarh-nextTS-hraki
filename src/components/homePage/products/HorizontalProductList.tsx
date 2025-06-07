"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  description?: string;
  features?: string[];
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
};

export default function HorizontalProductList({
  title = "Featured Products",
  products,
}: {
  title?: string;
  products: Product[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if content overflows
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        setIsOverflowing(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="py-8 relative group">
      <h2 className="text-xl font-bold text-gray-900 px-4 md:px-12 mb-4">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {isOverflowing && showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-800" />
          </motion.button>
        )}

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto px-4 md:px-12 gap-4 py-2 scrollbar-hide"
          onScroll={checkScrollPosition}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="flex-shrink-0 w-48 md:w-64 bg-white rounded-xl shadow-sm overflow-hidden relative group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <Image
            src={"/image/products/img-1.jpg"}
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

                {/* Like Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  whileTap={{ scale: 0.9 }}
                  aria-label={
                    likedProducts.includes(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <FiHeart
                    className={`${
                      likedProducts.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
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
                    <span className="font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                    aria-label="Add to cart"
                  >
                    <FiShoppingCart size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Quick View Trigger */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewProduct(product);
                }}
                className="absolute inset-0 w-full h-full z-10"
                aria-label={`Quick view ${product.name}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {isOverflowing && showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-l from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll right"
          >
            <FiChevronRight className="h-6 w-6 text-gray-800" />
          </motion.button>
        )}
      </div>

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
