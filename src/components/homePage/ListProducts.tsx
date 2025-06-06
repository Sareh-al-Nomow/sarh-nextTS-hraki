"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";

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
}: {
  title?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  // Your existing product data
  const products: Product[] = [
    {
      id: 1,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 2,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 3,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 4,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 5,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 6,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 7,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 8,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    {
      id: 9,
      name: "AirMax Pro Shoes",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/image/products/img-4.jpg",
      rating: 4.7,
      colors: ["#111827", "#6B7280", "#F59E0B"],
      tags: ["HOT", "30% OFF"],
      isNew: true,
    },
    // ... include all your other products
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
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
    <div className="mb-12 relative group">
      <h2 className="text-xl font-bold text-gray-900 px-4 md:px-12 mb-4">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <FiChevronLeft className="h-6 w-6 text-gray-800" />
          </motion.button>
        )}

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar px-4 md:px-12 gap-4 py-2"
          onScroll={checkScrollPosition}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm overflow-hidden relative group"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
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
                      className={`text-xs px-2 py-1 rounded-full  ${
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
                  >
                    <FiShoppingCart size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Quick View Trigger */}
              <button
                onClick={() => setQuickViewProduct(product)}
                className="absolute inset-0 z-10"
                aria-label={`Quick view ${product.name}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-l from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <FiChevronRight className="h-6 w-6 text-gray-800" />
          </motion.button>
        )}
      </div>

      {/* Quick View Modal (same as your existing implementation) */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            {/* ... your existing modal content ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
