"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ProductItem from "@/components/homePage/products/ProductItem";
import PaginationControls from "./PaginationControls";
import { Category } from "@/lib/models/categoryModal";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";
import { useTranslations, useLocale } from "next-intl";

interface ProductGridProps {
  products: FrontEndProductCartItem[];
  isLoading: boolean;
  pagination: {
    page: number;
    total: number;
  };
  handlePageChange: (page: number) => void;
  selectedCategory: Category | null;
  toggleCategoryId: (id: number) => void;
  likedProducts: number[];
  toggleLike: (product: FrontEndProductCartItem) => void;
  selectedCategoriesIds: number[];
  resetFilters: () => void;
}

const ProductGrid = ({
  products,
  isLoading,
  pagination,
  handlePageChange,
  selectedCategory,
  toggleCategoryId,
  likedProducts,
  selectedCategoriesIds,
  toggleLike,
  resetFilters,
}: ProductGridProps) => {
  const t = useTranslations("shopGrid.ProductGrid");
  const locale = useLocale();
  const isRTL = locale === "ar"; // Add other RTL languages as needed

  return (
    <div className="flex-1" dir={isRTL ? "rtl" : "ltr"}>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          {selectedCategory?.subCategory && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                {t("subcategories")}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {selectedCategory.subCategory.map((subC) => (
                  <div key={subC.id} className="flex flex-col items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleCategoryId(subC.id)}
                      className={`p-2 rounded-full border-2 ${
                        selectedCategoriesIds.includes(subC.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={
                          subC.description.image ?? "/image/products/img.png"
                        }
                        alt={subC.description.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </motion.button>
                    <span className="mt-2 text-sm text-center">
                      {subC.description.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                toggleLike={toggleLike}
                likedProducts={likedProducts}
              />
            ))}
          </motion.div>

          <PaginationControls
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / 10)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100"
        >
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2 mt-4">
              {t("noProducts.title")}
            </h3>
            <p className="text-gray-600 mb-6">{t("noProducts.description")}</p>
            <button
              onClick={() => resetFilters()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("noProducts.action")}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;
