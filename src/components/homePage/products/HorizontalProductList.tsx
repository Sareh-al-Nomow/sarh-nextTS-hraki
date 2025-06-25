"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductItem from "./ProductItem";
import { FrontendProduct } from "@/models/forntEndProduct";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HorizontalProductList({
  title = "Featured Products",
  id = 0,
  products,
}: {
  title?: string;
  products: FrontEndProductCartItem[];
  id?: number;
}) {
  const t = useTranslations("HorizontalProductList");
  const isRTL = t("dir") === "rtl";
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    showLeft: false,
    showRight: true,
    isOverflowing: false,
  });
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  // Load wishlist and setup scroll listeners
  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const wishlist: FrontendProduct[] = JSON.parse(storedWishlist);
      setLikedProducts(wishlist.map((product) => product.id));
    }

    // Check overflow and setup scroll listener
    const checkOverflow = () => {
      if (!scrollRef.current) return;

      const { scrollWidth, clientWidth } = scrollRef.current;
      const isOverflowing = scrollWidth > clientWidth;

      setScrollState((prev) => ({
        ...prev,
        isOverflowing,
        showRight: isOverflowing,
      }));
    };

    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      setScrollState((prev) => ({
        ...prev,
        showLeft: isRTL ? scrollLeft < 0 : scrollLeft > 0,
        showRight: isRTL
          ? scrollLeft > -maxScroll + 1
          : scrollLeft < maxScroll - 1,
      }));
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      resizeObserver.observe(scrollContainer);
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      resizeObserver.disconnect();
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [products, isRTL]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const effectiveDirection = isRTL
      ? direction === "left"
        ? "right"
        : "left"
      : direction;

    const scrollAmount = effectiveDirection === "left" ? -250 : 250;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const toggleLike = (product: FrontEndProductCartItem) => {
    const stored = localStorage.getItem("wishlist");
    let wishlist: FrontEndProductCartItem[] = stored ? JSON.parse(stored) : [];

    const exists = wishlist.some((p) => p.id === product.id);
    wishlist = exists
      ? wishlist.filter((p) => p.id !== product.id)
      : [...wishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setLikedProducts(wishlist.map((p) => p.id));
  };

  const viewAllHandler = () => {
    router.push(`/shopGrid?collectionId=${id}`);
  };

  return (
    <section className="py-5 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-blue-50 to-cyan-50">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-row justify-between items-center sm:items-center mb-8 gap-4"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h2>

        <motion.button
          onClick={viewAllHandler}
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#1a7a9a] to-cyan-500 text-white rounded-lg font-medium text-xl shadow-md hover:shadow-lg transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("ExploreAll")}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {isRTL ? "←" : "→"}
          </motion.span>
        </motion.button>
      </motion.header>

      {/* Product Carousel */}
      <div className="relative">
        {/* Navigation Arrows */}
        <AnimatePresence>
          {scrollState.isOverflowing && scrollState.showLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll("left")}
              className={`absolute ${
                isRTL ? "right-0" : "left-0"
              } top-0 bottom-0 z-20 w-16 h-full flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              aria-label={t("ScrollPrevious")}
            >
              <div className="p-2 bg-white rounded-full shadow-lg">
                {isRTL ? (
                  <FiChevronRight className="h-5 w-5 text-gray-800" />
                ) : (
                  <FiChevronLeft className="h-5 w-5 text-gray-800" />
                )}
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {scrollState.isOverflowing && scrollState.showRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll("right")}
              className={`absolute ${
                isRTL ? "left-0" : "right-0"
              } top-0 bottom-0 z-20 w-16 h-full flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              aria-label={t("ScrollNext")}
            >
              <div className="p-2 bg-white rounded-full shadow-lg">
                {isRTL ? (
                  <FiChevronLeft className="h-5 w-5 text-gray-800" />
                ) : (
                  <FiChevronRight className="h-5 w-5 text-gray-800" />
                )}
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth gap-6 py-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-[240px]"
            >
              <ProductItem
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
