"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFilter, FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import ProductItem from "@/components/homePage/products/ProductItem";
import { FrontendProduct } from "@/models/forntEndProduct";

const ShopGridPage = () => {
  // Demo data
  const demoProducts: FrontendProduct[] = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "89.99",
      originalPrice: "129.99",
      rating: 4.5,
      isNew: true,
      tags: ["BESTSELLER", "HOT"],
      description:
        "Premium noise-cancelling wireless headphones with 30hr battery life",
      features: ["Active Noise Cancellation", "30hr Playtime", "Built-in Mic"],
      colors: ["#000000", "#3b82f6", "#ef4444"],
      uuid: "",
      image: "",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "149.99",
      rating: 4.2,
      tags: ["NEW"],
      description: "Track your workouts, heart rate, and sleep patterns",
      features: ["Heart Rate Monitor", "Water Resistant", "7-day Battery"],
      colors: ["#000000", "#ffffff"],
      uuid: "",
      image: "",
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: "59.99",
      originalPrice: "79.99",
      rating: 4.3,
      tags: ["BESTSELLER"],
      description: "High-quality sound with 20hr battery life",
      features: ["360° Sound", "IPX7 Waterproof", "Bluetooth 5.0"],
      colors: ["#000000", "#10b981"],
      uuid: "",
      image: "",
    },
    {
      id: 4,
      name: "Ultra HD 4K Camera",
      price: "499.99",
      rating: 4.8,
      isNew: true,
      tags: ["NEW", "HOT"],
      description: "Professional 4K camera with 24.2MP sensor",
      features: ["4K Video", "Wi-Fi Connectivity", "3-inch Touchscreen"],
      colors: ["#000000"],
      uuid: "",
      image: "",
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      price: "249.99",
      originalPrice: "299.99",
      rating: 4.6,
      tags: ["BESTSELLER"],
      description: "Comfortable chair with lumbar support",
      features: ["Adjustable Height", "Breathable Mesh", "360° Swivel"],
      colors: ["#000000", "#6b7280"],
      uuid: "",
      image: "",
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: "29.99",
      rating: 4.1,
      tags: ["NEW"],
      description: "Fast charging pad for all Qi-enabled devices",
      features: ["15W Fast Charge", "LED Indicator", "Non-slip Surface"],
      colors: ["#000000", "#ffffff"],
      uuid: "",
      image: "",
    },
    {
      id: 7,
      name: "Noise Cancelling Earbuds",
      price: "129.99",
      originalPrice: "159.99",
      rating: 4.4,
      isNew: true,
      tags: ["HOT"],
      description: "True wireless earbuds with active noise cancellation",
      features: ["ANC Technology", "24hr Battery", "Touch Controls"],
      colors: ["#000000", "#3b82f6"],
      uuid: "",
      image: "",
    },
    {
      id: 8,
      name: "Smart Home Hub",
      price: "199.99",
      rating: 4.7,
      tags: ["NEW", "BESTSELLER"],
      description: "Control all your smart devices from one place",
      features: ["Voice Assistant", "100+ Compatible Devices", "4K Streaming"],
      colors: ["#000000", "#6b7280"],
      uuid: "",
      image: "",
    },
  ];

  // State
  const [products, setProducts] = useState<FrontendProduct[]>(demoProducts);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "BESTSELLER",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Available categories from tags
  const allCategories = Array.from(
    new Set(demoProducts.flatMap((p) => p.tags || []))
  );

  // Toggle like with animation feedback
  const toggleLike = (product: FrontendProduct) => {
    setLikedProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Filter and sort products with simulated loading
  useEffect(() => {
    const filterProducts = async () => {
      setIsLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filtered = [...demoProducts];

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(
          (p) =>
            p.tags && p.tags.some((tag) => selectedCategories.includes(tag))
        );
      }

      // Price filter
      filtered = filtered.filter(
        (p) =>
          Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
      );

      // Sorting
      switch (sortOption) {
        case "price-low":
          filtered.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case "price-high":
          filtered.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          // "featured" - keep original order
          break;
      }

      setProducts(filtered);
      setIsLoading(false);
    };

    filterProducts();
  }, [searchQuery, sortOption, priceRange, selectedCategories]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSortOption("featured");
    setPriceRange([0, 500]);
    setSelectedCategories([]);
  };

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
                <div className="px-2 space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                      className="absolute top-0 h-1.5 bg-blue-500 rounded-l-lg pointer-events-none"
                      style={{
                        left: `${(priceRange[0] / 500) * 100}%`,
                        right: `${100 - (priceRange[1] / 500) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <span className="font-medium">${priceRange[0]}</span>
                  <span className="font-medium">${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                <div className="space-y-3">
                  {allCategories.map((category) => (
                    <motion.label
                      key={category}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center group cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                          {selectedCategories.includes(category) && (
                            <svg
                              className="w-3 h-3 text-white"
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
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {products.length} of {demoProducts.length} products
              </p>
              {selectedCategories.length > 0 && (
                <div className="flex gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full flex items-center"
                    >
                      {category}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="ml-1.5 text-blue-500 hover:text-blue-700"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Products */}
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
              transition={{ type: "spring", damping: 30 }}
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
                  <div className="px-2">
                    <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                      <div
                        className="absolute h-2 bg-blue-500 rounded-full mb-4"
                        style={{
                          left: `${(priceRange[0] / 500) * 100}%`,
                          right: `${100 - (priceRange[1] / 500) * 100}%`,
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Math.min(
                            parseInt(e.target.value),
                            priceRange[1] - 10
                          );
                          setPriceRange([value, priceRange[1]]);
                        }}
                        className="absolute w-full h-2 appearance-none pointer-events-none opacity-0"
                      />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Math.max(
                            parseInt(e.target.value),
                            priceRange[0] + 10
                          );
                          setPriceRange([priceRange[0], value]);
                        }}
                        className="absolute w-full h-2 appearance-none pointer-events-none opacity-0"
                      />
                      <div className="absolute flex justify-between w-full -bottom-6">
                        <span className="text-sm text-gray-600">
                          ${priceRange[0]}
                        </span>
                        <span className="text-sm text-gray-600">
                          ${priceRange[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
                  <div className="space-y-3">
                    {allCategories.map((category) => (
                      <motion.label
                        key={category}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center group cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                            {selectedCategories.includes(category) && (
                              <svg
                                className="w-3 h-3 text-white"
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
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                          {category}
                        </span>
                      </motion.label>
                    ))}
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
