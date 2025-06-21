"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/lib/models/productsModal";
import ProductItem from "./ProductItem";
import Spinner from "../../UI/SpinnerLoading";
import { getProducts } from "@/lib/axios/getProductsAxios";
import { transformProduct } from "@/utils/trnsformProduct";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
import { useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 10;

export default function Products() {
  const t = useTranslations("Products");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<FrontEndProductCartItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError, refetch } = useQuery<
    ProductsResponse,
    Error
  >({
    queryKey: ["products", currentPage],
    queryFn: ({ signal }) =>
      getProducts(
        {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
        signal
      ),
  });

  useEffect(() => {
    if (data) {
      const newProducts = data.data.map(
        transformProduct
      ) as FrontEndProductCartItem[];
      setAllProducts((prev) => [...prev, ...newProducts]);
      setHasMore(currentPage < (data.totalPages || 1));
    }
  }, [data, currentPage]);

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

  if (isLoading && currentPage === 1) {
    return (
      <div className="mb-40">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{t("error.loading")}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("error.retry")}
        </button>
      </div>
    );
  }

  if (allProducts.length === 0 && !isLoading) {
    return (
      <div className="text-center py-10">
        <p>{t("empty")}</p>
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
        <h1 className="text-3xl font-bold text-gray-900 pr-text text-center">
          {t("header.title")}
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          {t("header.count", {
            shown: allProducts.length,
            total: data?.total || 0,
          })}
        </p>
      </motion.header>

      {/* Product Grid */}
      <div className="px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center md:justify-items-start gap-4"
        >
          {allProducts.map(
            (product: FrontEndProductCartItem, index: number) => (
              <ProductItem
                key={index}
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
              />
            )
          )}
        </motion.div>
      </div>

      {/* Loading spinner when loading more */}
      {isLoading && currentPage > 1 && (
        <div className="flex justify-center py-6 pb-20">
          <Spinner />
        </div>
      )}

      {/* View More Button */}
      {hasMore && !isLoading && (
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
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {t("viewMore")}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
