"use client";

import { SearchContext } from "@/store/SearchContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useRef } from "react";
import { FiSearch, FiX, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSearchProducts } from "@/lib/axios/searchAxios";
import { Product } from "@/lib/models/productsModal";
import { transformProductCartItem } from "@/utils/trnsformProductCartItem";

// Mock product data - replace with your API call
// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   category: string;
// };

// const mockSearchResults = (query: string): Product[] => {
//   if (!query) return [];

//   return [
//     {
//       id: 1,
//       name: "Wireless Noise-Cancelling Headphones",
//       price: 199.99,
//       image: "/image/categories/book.jpg",
//       rating: 4.5,
//       category: "Audio",
//     },
//     {
//       id: 2,
//       name: "Smart Watch Series 5",
//       price: 249.99,
//       image: "/image/categories/book.jpg",
//       rating: 4.2,
//       category: "Wearables",
//     },
//     {
//       id: 3,
//       name: "Premium Bluetooth Speaker",
//       price: 129.99,
//       image: "/image/categories/book.jpg",
//       rating: 4.7,
//       category: "Audio",
//     },
//   ];
// };

export default function SearchField() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const router = useRouter();

  const {
    data: resultData,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: ({ signal }) =>
      getSearchProducts({ q: searchTerm, limit: 5 }, signal),
    enabled: searchTerm.trim() !== "", // لا تنفذ الاستعلام إذا كان الحقل فارغ
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    if (resultData) {
      setResults(resultData.data);
    }
  }, [searchTerm, resultData]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    router.push(`/shopGrid?query=${encodeURIComponent(searchTerm)}`);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const navigateToProduct = (urlKey: string) => {
    router.push(`/product/${urlKey}`);
    setIsFocused(false);
  };

  const displayedProducts = results.map(transformProductCartItem);
  return (
    <div ref={searchRef} className="w-full relative">
      {/* Search Input - Maintained your exact styling */}
      <div className="relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={t("searchPlaceholder")}
          dir={isRtl ? "rtl" : "ltr"}
          className="w-full p-2 px-3 md:px-5 text-[16px] md:text-xl shadow rounded-xl bg-white focus:shadow-black/60 transition-all duration-200"
        />

        {searchTerm ? (
          <button
            onClick={clearSearch}
            className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${
              isRtl ? "left-3" : "right-3"
            }`}
          >
            <FiX className="text-gray-500" />
          </button>
        ) : (
          <FiSearch
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRtl ? "left-3" : "right-3"
            } text-gray-400 text-xl md:text-2xl`}
          />
        )}
      </div>

      {/* Expanded Results Dropdown */}
      {isFocused && (results.length > 0 || searchTerm) && (
        <div className="absolute z-50 mt-2 w-[calc(100%+200px)] -left-[92px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-medium text-gray-700">Search Results</h3>
              </div>
              <ul className="py-2 max-h-[60vh] overflow-y-auto">
                {displayedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <button
                      className="w-full text-left p-4 flex items-center gap-4 group"
                      onClick={() => navigateToProduct(product.url_key)}
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-lg truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-primary font-semibold">
                            ${product.price}
                          </span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-sm text-gray-500"></span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.rating})
                          </span>
                        </div>
                      </div>
                      <FiChevronRight className="text-gray-400 group-hover:text-primary ml-2" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={handleSearch}
                  className="w-full py-2 text-primary font-medium flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                  View all {results.length} results
                </button>
              </div>
            </>
          ) : searchTerm && !isLoading ? (
            <div className="p-4 text-center text-gray-500">
              No results found for &quot;{searchTerm}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
