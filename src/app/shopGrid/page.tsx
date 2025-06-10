"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";
import ProductItem from "@/components/homePage/products/ProductItem";
import { FrontendProduct } from "@/models/forntEndProduct";
import { ProductsResponse } from "@/lib/models/productsModal";
import { useQuery } from "@tanstack/react-query";
import { getProducts, GetProductsParams } from "@/lib/axios/getProductsAxios";
import Spinner from "@/components/UI/SpinnerLoading";
import { getCategories } from "@/lib/axios/categoryAxios";
import { organizeCategories } from "@/utils/organizeCategories";
import { transformProduct } from "@/utils/trnsformProduct";

const MAX_PRICE = 1000;

const ShopGridPage = () => {
  // State
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [activeHandle, setActiveHandle] = useState<null | "min" | "max">(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );
  const [productQuery, setProductQuery] = useState<GetProductsParams>({
    page: 1,
    limit: 10,
  });

  // Fetch products
  const {
    data: productsData,
    isLoading: isLoadingFetchProducts,
    error,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", productQuery],
    queryFn: ({ signal }) => getProducts(productQuery, signal),
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Organize categories data
  const organizedCategories = categoriesData
    ? organizeCategories(categoriesData.data)
    : null;

  // Transform products data
  const displayProducts = productsData?.data.map((p) => transformProduct(p));

  // Handle wishlist
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

  // Handle category selection
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  // Handle price range slider
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeHandle) return;

      const target = e.target as HTMLElement;
      const slider = target.closest(".relative") as HTMLElement | null;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      const newValue = Math.round(percentage * MAX_PRICE);

      if (activeHandle === "min") {
        setPriceRange([Math.min(newValue, priceRange[1] - 10), priceRange[1]]);
      } else {
        setPriceRange([priceRange[0], Math.max(newValue, priceRange[0] + 10)]);
      }
    };

    const handleMouseUp = () => {
      setActiveHandle(null);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (activeHandle) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeHandle, priceRange]);

  // Handle category selection
  const toggleCategoryId = async (categoryId: number) => {
    setSelectedCategoriesIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [categoryId]
    );

    setProductQuery((prev) => {
      if (prev.categoryId === categoryId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { categoryId: _, ...rest } = prev;
        return rest as Omit<typeof prev, "categoryId">;
      }
      return {
        ...prev,
        categoryId,
      };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSortOption("featured");
    setPriceRange([0, 500]);
    setSelectedCategoriesIds([]);
    setExpandedCategories({});
    setProductQuery({
      page: 1,
      limit: 10,
    });
  };

  // Loading and error states
  if (isLoadingCategory) {
    return (
      <div className="my-40">
        <Spinner />
      </div>
    );
  }

  if (error || errorCategory) {
    return (
      <div className="my-20">
        <h1>{error?.name || errorCategory?.name}</h1>
        <h3>{error?.message || errorCategory?.message}</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#219EBC] to-[#023047] text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Our Collection
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Premium products curated for exceptional experiences
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort and Filter */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <div className="relative group">
              <select
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer transition-all duration-200 hover:border-gray-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              className="md:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:border-gray-300 transition-all"
              onClick={() => setShowFilters(true)}
            >
              <FiFilter className="text-gray-600" />
              <span className="text-gray-700">Filters</span>
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Reset all
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium mb-4 text-gray-700">Price Range</h4>
                <div className="space-y-4">
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div
                      className="absolute h-2 bg-blue-500 rounded-full"
                      style={{
                        left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                        right: `${100 - (priceRange[1] / MAX_PRICE) * 100}%`,
                      }}
                    />
                    <div
                      className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md"
                      style={{ left: `${(priceRange[0] / MAX_PRICE) * 100}%` }}
                      onMouseDown={() => setActiveHandle("min")}
                    />
                    <div
                      className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md"
                      style={{ left: `${(priceRange[1] / MAX_PRICE) * 100}%` }}
                      onMouseDown={() => setActiveHandle("max")}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Min:</span>
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1] - 10}
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Math.min(
                            parseInt(e.target.value) || 0,
                            priceRange[1] - 10
                          );
                          setPriceRange([value, priceRange[1]]);
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Max:</span>
                      <input
                        type="number"
                        min={priceRange[0] + 10}
                        max={MAX_PRICE}
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Math.max(
                            parseInt(e.target.value) || MAX_PRICE,
                            priceRange[0] + 10
                          );
                          setPriceRange([priceRange[0], value]);
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                <div className="space-y-2">
                  {organizedCategories?.parentsWithChildren.map((category) => (
                    <div key={category.description.name} className="space-y-1">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between w-full text-left ${
                          category.children ? "font-semibold" : ""
                        }`}
                        onClick={() =>
                          category.children
                            ? toggleCategoryExpansion(category.description.name)
                            : toggleCategoryId(category.id)
                        }
                      >
                        <span
                          className={
                            selectedCategoriesIds.includes(category.id)
                              ? "text-blue-600"
                              : "text-gray-700"
                          }
                        >
                          {category.description.name}
                        </span>
                        {category.children && (
                          <FiChevronRight
                            className={`transition-transform ${
                              expandedCategories[category.description.name]
                                ? "transform rotate-90"
                                : ""
                            }`}
                          />
                        )}
                      </motion.button>

                      {category.children &&
                        expandedCategories[category.description.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-1"
                          >
                            {category.children.map((subcategory) => {
                              return (
                                <motion.label
                                  key={subcategory.id}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center group cursor-pointer"
                                >
                                  <div className="relative">
                                    <input
                                      id={`${subcategory.id}`}
                                      type="radio"
                                      name="categoryId"
                                      checked={selectedCategoriesIds.includes(
                                        subcategory.id
                                      )}
                                      onChange={() =>
                                        toggleCategoryId(subcategory.id)
                                      }
                                      className="sr-only peer"
                                    />
                                    <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                                      {selectedCategoriesIds.includes(
                                        subcategory.id
                                      ) && (
                                        <svg
                                          className="w-2.5 h-2.5 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                  <span
                                    className={`ml-2 text-sm ${
                                      selectedCategoriesIds.includes(
                                        subcategory.id
                                      )
                                        ? "text-blue-600"
                                        : "text-gray-600"
                                    } group-hover:text-gray-900 transition-colors`}
                                  >
                                    {subcategory.description.name}
                                  </span>
                                </motion.label>
                              );
                            })}
                          </motion.div>
                        )}
                    </div>
                  ))}
                  {organizedCategories?.parentsWithoutChildren.map(
                    (category) => {
                      return (
                        <motion.label
                          key={category.id}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center group cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="categoryId"
                              checked={selectedCategoriesIds.includes(
                                category.id
                              )}
                              onChange={() => toggleCategoryId(category.id)}
                              className="sr-only peer"
                            />
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                              {selectedCategoriesIds.includes(category.id) && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span
                            className={`ml-2 text-sm ${
                              selectedCategoriesIds.includes(category.id)
                                ? "text-blue-600"
                                : "text-gray-600"
                            } group-hover:text-gray-900 transition-colors`}
                          >
                            {category.description.name}
                          </span>
                        </motion.label>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {displayProducts?.length || 0} products
              </p>
              {selectedCategoriesIds.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-end">
                  {selectedCategoriesIds.map((categoryId) => {
                    const category = [
                      ...(organizedCategories?.parentsWithChildren || []),
                      ...(organizedCategories?.parentsWithoutChildren || []),
                    ].find((c) => c.id === categoryId);

                    return category ? (
                      <motion.span
                        key={categoryId}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full flex items-center"
                      >
                        {category.description.name}
                        <button
                          onClick={() => toggleCategoryId(categoryId)}
                          className="ml-1.5 text-blue-500 hover:text-blue-700"
                        >
                          <FiX size={14} />
                        </button>
                      </motion.span>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Products */}
            {isLoadingFetchProducts ? (
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
            ) : (displayProducts ?? []).length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {(displayProducts ?? []).map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    toggleLike={toggleLike}
                    likedProducts={likedProducts}
                  />
                ))}
              </motion.div>
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
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn`t find any items matching your criteria
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 15 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-gray-700">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-2 bg-blue-500 rounded-full"
                        style={{
                          left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                          right: `${100 - (priceRange[1] / MAX_PRICE) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md"
                        style={{
                          left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                        }}
                        onMouseDown={() => setActiveHandle("min")}
                      />
                      <div
                        className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md"
                        style={{
                          left: `${(priceRange[1] / MAX_PRICE) * 100}%`,
                        }}
                        onMouseDown={() => setActiveHandle("max")}
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Min:</span>
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1] - 10}
                          value={priceRange[0]}
                          onChange={(e) => {
                            const value = Math.min(
                              parseInt(e.target.value) || 0,
                              priceRange[1] - 10
                            );
                            setPriceRange([value, priceRange[1]]);
                          }}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Max:</span>
                        <input
                          type="number"
                          min={priceRange[0] + 10}
                          max={MAX_PRICE}
                          value={priceRange[1]}
                          onChange={(e) => {
                            const value = Math.max(
                              parseInt(e.target.value) || MAX_PRICE,
                              priceRange[0] + 10
                            );
                            setPriceRange([priceRange[0], value]);
                          }}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                  <div className="space-y-2">
                    {organizedCategories?.parentsWithChildren.map(
                      (category) => (
                        <div
                          key={category.description.name}
                          className="space-y-1"
                        >
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center justify-between w-full text-left ${
                              category.children ? "font-semibold" : ""
                            }`}
                            onClick={() =>
                              category.children
                                ? toggleCategoryExpansion(
                                    category.description.name
                                  )
                                : toggleCategoryId(category.id)
                            }
                          >
                            <span
                              className={
                                selectedCategoriesIds.includes(category.id)
                                  ? "text-blue-600"
                                  : "text-gray-700"
                              }
                            >
                              {category.description.name}
                            </span>
                            {category.children && (
                              <FiChevronRight
                                className={`transition-transform ${
                                  expandedCategories[category.description.name]
                                    ? "transform rotate-90"
                                    : ""
                                }`}
                              />
                            )}
                          </motion.button>

                          {category.children &&
                            expandedCategories[category.description.name] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-1"
                              >
                                {category.children.map((subcategory) => {
                                  return (
                                    <motion.label
                                      key={subcategory.id}
                                      whileTap={{ scale: 0.95 }}
                                      className="flex items-center group cursor-pointer"
                                    >
                                      <div className="relative">
                                        <input
                                          type="radio"
                                          name="categoryId"
                                          checked={selectedCategoriesIds.includes(
                                            subcategory.id
                                          )}
                                          onChange={() =>
                                            toggleCategoryId(subcategory.id)
                                          }
                                          className="sr-only peer"
                                        />
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                                          {selectedCategoriesIds.includes(
                                            subcategory.id
                                          ) && (
                                            <svg
                                              className="w-2.5 h-2.5 text-white"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                      <span
                                        className={`ml-2 text-sm ${
                                          selectedCategoriesIds.includes(
                                            subcategory.id
                                          )
                                            ? "text-blue-600"
                                            : "text-gray-600"
                                        } group-hover:text-gray-900 transition-colors`}
                                      >
                                        {subcategory.description.name}
                                      </span>
                                    </motion.label>
                                  );
                                })}
                              </motion.div>
                            )}
                        </div>
                      )
                    )}
                    {organizedCategories?.parentsWithoutChildren.map(
                      (category) => {
                        return (
                          <motion.label
                            key={category.id}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center group cursor-pointer"
                          >
                            <div className="relative">
                              <input
                                type="radio"
                                name="categoryId"
                                checked={selectedCategoriesIds.includes(
                                  category.id
                                )}
                                onChange={() => toggleCategoryId(category.id)}
                                className="sr-only peer"
                              />
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                                {selectedCategoriesIds.includes(
                                  category.id
                                ) && (
                                  <svg
                                    className="w-2.5 h-2.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span
                              className={`ml-2 text-sm ${
                                selectedCategoriesIds.includes(category.id)
                                  ? "text-blue-600"
                                  : "text-gray-600"
                              } group-hover:text-gray-900 transition-colors`}
                            >
                              {category.description.name}
                            </span>
                          </motion.label>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-3">
                <button
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  onClick={resetFilters}
                >
                  Reset
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopGridPage;
