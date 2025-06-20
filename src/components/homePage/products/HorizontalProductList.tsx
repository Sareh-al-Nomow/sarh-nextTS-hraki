"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import ProductItem from "./ProductItem";
import { FrontendProduct } from "@/models/forntEndProduct";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
import { useRouter } from "next/navigation";

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

export default function HorizontalProductList({
  title = "Featured Products",
  id = 0,
  products,
}: {
  title?: string;
  products: FrontEndProductCartItem[];
  id: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const router = useRouter();

  // Check if content overflows
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const wishlist: FrontendProduct[] = stored ? JSON.parse(stored) : [];

    if (stored) {
      const wishlistIDS = wishlist.flatMap((p) => p.id);
      setLikedProducts(wishlistIDS);
    }

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
  };

  function viewAllHandler() {
    router.push(`/shopGrid?collectionId=${id}`);
  }

  return (
    <div className="pt-8 relative group">
      <motion.div
        className="flex justify-between items-center w-full px-4 md:px-12 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold pr-text"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h2>

        <motion.button
          onClick={viewAllHandler}
          className=" cursor-pointer px-5 py-2.5 rounded-xl font-semibold text-white pr-bg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2"
          whileHover={{
            scale: 1.05,
            background: "linear-gradient(to right, #212249, #023047)",
            boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Explore All
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

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
            <ProductItem
              key={product.id}
              product={product}
              toggleLike={toggleLike}
              likedProducts={likedProducts}
            />
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
    </div>
  );
}
