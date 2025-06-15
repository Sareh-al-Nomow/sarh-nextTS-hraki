"use client";

import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiFilter, FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import ProductItem from "@/components/homePage/products/ProductItem";
import { FrontendProduct } from "@/models/forntEndProduct";
import { ProductsResponse } from "@/lib/models/productsModal";
import { useQuery } from "@tanstack/react-query";
import { getProducts, GetProductsParams } from "@/lib/axios/getProductsAxios";
import Spinner from "@/components/UI/SpinnerLoading";
import { getCategories } from "@/lib/axios/categoryAxios";
import { organizeCategories } from "@/utils/organizeCategories";
import { transformProduct } from "@/utils/trnsformProduct";
import { GoDotFill } from "react-icons/go";
import { Category } from "@/lib/models/categoryModal";
import { useSearchParams } from "next/navigation";
import { SearchContext } from "@/store/SearchContext";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";

const MAX_PRICE = 5000;

const ShopGridPage = () => {
  // State
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeHandle, setActiveHandle] = useState<null | "min" | "max">(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const param = useSearchParams();
  const { clearSearchTerm } = useContext(SearchContext);

  // Helper function to determine limit per page

  // Product query with pagination
  const [productQuery, setProductQuery] = useState<
    Omit<GetProductsParams, "name" | "limit"> & {
      name?: string;
      limit?: number;
    }
  >({
    page: 1,
    // No limit or name by default
  });
  // Fetch products
  const {
    data: productsData,
    isLoading: isLoadingFetchProducts,
    error,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", productQuery],
    queryFn: ({ signal }) => {
      const query: GetProductsParams = { page: productQuery.page };

      // Only add non-empty fields
      if (productQuery.name?.trim()) query.name = productQuery.name.trim();
      if (productQuery.categoryId) query.categoryId = productQuery.categoryId;

      return getProducts(query, signal);
    },
  });
  console.log(pagination);

  // Update pagination only when productsData changes
  useEffect(() => {
    if (productsData) {
      setPagination((prev) => {
        // Only update if values actually changed
        if (prev.total === productsData.total) {
          return prev;
        }
        return {
          ...prev,
          total: productsData.total,
        };
      });
    }
  }, [productsData]); // Removed productQuery.page from dependencies
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
  useEffect(() => {
    const displayProducts = productsData?.data.map((p) => transformProduct(p));
    if (displayProducts) {
      setProducts(displayProducts);
    }
  }, [productsData?.data]);

  // Handle initial URL params
  useEffect(() => {
    const cateID = param.get("categoryid");
    const searchTerm = param.get("query");

    if (cateID) {
      const categoryId = Number(cateID);
      setSelectedCategoriesIds([categoryId]);
      setProductQuery((prev) => ({
        ...prev,
        categoryId,
        page: 1,
      }));

      const c = organizedCategories?.allWithSub.find(
        (c) => c.id === categoryId
      );
      if (c) handleSelectedCategory(c);
    }

    if (searchTerm) setSearchQuery(searchTerm);
  }, [param, clearSearchTerm]);

  // Filter and sort products
  useEffect(() => {
    if (!productsData?.data) return;

    const allProducts = productsData.data.map((p) => transformProduct(p));
    const [min, max] = priceRange;

    const filtered = allProducts.filter(
      (product) => Number(product.price) >= min && Number(product.price) <= max
    );

    if (sortOption === "price-low") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "price-high") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setProducts(filtered);
  }, [productsData, priceRange, sortOption]);

  // Handle search query changes
  useEffect(() => {
    if (searchQuery) {
      setProductQuery((prev) => ({
        ...prev,
        name: searchQuery,
        page: 1,
      }));
    }
  }, [searchQuery]);

  // Handle category selection
  const toggleCategoryId = async (categoryId: number) => {
    const cate = organizedCategories?.allWithSub.find(
      (c) => c.id === categoryId
    );
    if (cate) handleSelectedCategory(cate);

    if (selectedCategory?.id === categoryId) setSelectedCategory(null);

    setSelectedCategoriesIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [categoryId]
    );

    setProductQuery((prev) => {
      if (prev.categoryId === categoryId) {
        const { categoryId: _, ...rest } = prev;
        console.log(_);
        return {
          ...rest,
          page: 1,
        };
      }
      return {
        ...prev,
        categoryId,
        page: 1,
      };
    });
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

  function handleSelectedCategory(category: Category) {
    setSelectedCategory(category);
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSortOption("featured");
    setPriceRange([0, 5000]);
    setSelectedCategoriesIds([]);
    setSelectedCategory(null);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
    setProductQuery((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  // Handle wishlist
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const wishlist: FrontendProduct[] = stored ? JSON.parse(stored) : [];

    if (stored) {
      const wishlistIDS = wishlist.flatMap((p) => p.id);
      setLikedProducts(wishlistIDS);
    }

    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) window.scrollTo(0, parseInt(scrollY));
  }, []);

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

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    const page = Math.max(1, Math.min(newPage, 3));
    const limit = productQuery.limit ?? 10;

    // Only update if page actually changed
    if (page !== pagination.page) {
      setPagination((prev) => ({
        ...prev,
        page,
        limit,
      }));

      setProductQuery((prev) => ({
        ...prev,
        page,
        limit,
      }));
    }
  };

  // Pagination Controls Component
  const PaginationControls = () => {
    const count = productsData?.total ? Math.ceil(productsData.total / 10) : 1;

    console.log(count);

    return (
      <div className="flex justify-center mt-8 gap-2">
        {count > 1 && (
          <>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(count)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded ${
                    pagination.page === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {page}{" "}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page)}
              disabled={pagination.page === count}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </>
        )}
      </div>
    );
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
                  {organizedCategories?.allParent.map((category) => {
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
                            onChange={() => {
                              toggleCategoryId(category.id);
                              handleSelectedCategory(category);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                            {selectedCategoriesIds.includes(category.id) && (
                              <GoDotFill className="text-white" />
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
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {products?.length || 0} products (Page {pagination.page}
                )
              </p>
              {selectedCategoriesIds.length > 0 && (
                <div className="flex gap-2 flex-wrap justify-end">
                  {selectedCategoriesIds.map((categoryId) => {
                    const category = [
                      ...(organizedCategories?.allWithSub || []),
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
            ) : (products ?? []).length > 0 ? (
              <>
                {selectedCategory?.subCategory && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">
                      Subcategories
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {selectedCategory.subCategory.map((subC) => (
                        <div
                          key={subC.id}
                          className="flex flex-col items-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className={`p-2 rounded-full border-2 ${
                              selectedCategoriesIds.includes(subC.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"
                            }`}
                            onClick={() => {
                              toggleCategoryId(subC.id);
                              handleSelectedCategory(subC);
                            }}
                          >
                            <Image
                              src={subC.description.image}
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

                {/* Pagination Controls */}
                <PaginationControls />
              </>
            ) : pagination.page > 1 ? (
              <div className="text-center py-8">
                <p>No products found on page {pagination.page + 1}</p>
                <button
                  onClick={() => handlePageChange(1)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Go to first page
                </button>
                <PaginationControls />
              </div>
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
                    <div className="flex justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Min:</span>
                        <input
                          type="number"
                          min="0"
                          value={priceRange[0]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setPriceRange([value, priceRange[1]]);
                          }}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Max:</span>
                        <input
                          type="number"
                          min="0"
                          value={priceRange[1]}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setPriceRange([priceRange[0], value]);
                          }}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                  <div className="space-y-2">
                    {organizedCategories?.allParent.map((category) => {
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
                              onChange={() => {
                                toggleCategoryId(category.id);
                                handleSelectedCategory(category);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                              {selectedCategoriesIds.includes(category.id) && (
                                <GoDotFill className="text-white" />
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
                    })}
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
