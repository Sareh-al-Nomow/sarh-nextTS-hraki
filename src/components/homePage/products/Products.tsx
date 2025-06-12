"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/lib/models/productsModal";
import ProductItem from "./ProductItem";
import Spinner from "../../UI/SpinnerLoading";
import { FrontendProduct } from "@/models/forntEndProduct";
import { getProducts } from "@/lib/axios/getProductsAxios";
import { transformProduct } from "@/utils/trnsformProduct";

export default function Products() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const { data, isLoading, isError, refetch } = useQuery<
    ProductsResponse,
    Error
  >({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(undefined, signal),
  });

  const displayedProducts = data?.data?.map(transformProduct) || [];

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const wishlist: FrontendProduct[] = stored ? JSON.parse(stored) : [];

    if (stored) {
      const wishlistIDS = wishlist.flatMap((p) => p.id);
      setLikedProducts(wishlistIDS);
    }

    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const toggleLike = (product: FrontendProduct) => {
    const stored = localStorage.getItem("wishlist");
    let wishlist: FrontendProduct[] = stored ? JSON.parse(stored) : [];

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

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500"> Failed to load products</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 py-1 bg-gradient-to-r from-blue-50 to-cyan-50"
      >
        <h1 className="text-3xl font-bold text-gray-900 pr-text">
          Premium Collection
        </h1>
        <p className="text-gray-600 mt-2">Showing {data?.total} products</p>
      </motion.header>

      {/* Product Grid */}
      <div className="px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center md:justify-items-start gap-4"
        >
          {displayedProducts.map((product: FrontendProduct) => (
            <ProductItem
              key={product.id}
              product={product}
              toggleLike={toggleLike}
              likedProducts={likedProducts}
            />
          ))}
        </motion.div>
      </div>

      {/* Load More Button */}
      {data && data.page < data.totalPages && (
        <motion.div
          className="mt-6 sm:mt-12 text-center pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 mb-8 bg-gradient-to-r from-[#219EBC] to-[#2EC4B6] text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
            onClick={() => {
              // Implement load more functionality
            }}
          >
            Load More ({data.total - displayedProducts.length} remaining)
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
