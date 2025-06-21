"use client";

import { FiFilter, FiSearch } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";

interface ToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  setShowFilters: (show: boolean) => void;
}

const Toolbar = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  setShowFilters,
}: ToolbarProps) => {
  const t = useTranslations("shopGrid.Toolbar");
  const locale = useLocale();
  const isRTL = locale === "ar"; // Add other RTL languages as needed

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <div
          className={`absolute inset-y-0 ${
            isRTL ? "right-0 pr-3" : "left-0 pl-3"
          } flex items-center pointer-events-none`}
        >
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className={`${
            isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
          } py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sort and Filter Controls */}
      <div className="flex gap-3 w-full md:w-auto">
        {/* Sort Dropdown */}
        <div className="relative group">
          <select
            className={`appearance-none bg-white border border-gray-200 rounded-lg ${
              isRTL ? "pr-4 pl-10" : "pl-4 pr-10"
            } py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer transition-all duration-200 hover:border-gray-300`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">{t("sortOptions.featured")}</option>
            <option value="price-low">{t("sortOptions.priceLow")}</option>
            <option value="price-high">{t("sortOptions.priceHigh")}</option>
          </select>
          <div
            className={`absolute inset-y-0 ${
              isRTL ? "left-3" : "right-3"
            } flex items-center pointer-events-none`}
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          className="md:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:border-gray-300 transition-all"
          onClick={() => setShowFilters(true)}
        >
          <FiFilter className="text-gray-600" />
          <span className="text-gray-700">{t("filters")}</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
