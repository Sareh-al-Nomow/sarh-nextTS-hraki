import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import FilterSection from "./FilterSection";
import { PriceRange } from "@/models/frontEndPrice";
import { Category } from "@/lib/models/categoryModal";
import { Brand } from "@/models/frontEndBrand";

interface MobileFiltersModalProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  organizedCategories: {
    allParent: Category[];
    allWithSub: Category[];
  } | null;
  selectedCategoriesIds: number[];
  toggleCategoryId: (id: number) => void;
  organizedBrands: Brand[];
  selectedBrandIds: number[];
  toggleBrandId: (id: number) => void;
  resetFilters: () => void;
  MAX_PRICE: number;
}

const MobileFiltersModal = ({
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  organizedCategories,
  selectedCategoriesIds,
  toggleCategoryId,
  organizedBrands,
  selectedBrandIds,
  toggleBrandId,
  resetFilters,
  MAX_PRICE,
}: MobileFiltersModalProps) => {
  return (
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
              <PriceRangeSlider
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                MAX_PRICE={MAX_PRICE}
                isMobile
              />

              {organizedCategories && (
                <FilterSection
                  title="Categories"
                  items={organizedCategories.allParent.slice(0, 3)}
                  selectedIds={selectedCategoriesIds}
                  toggleId={toggleCategoryId}
                  getItemName={(item) => item.description.name}
                />
              )}

              {organizedBrands.length > 0 && (
                <FilterSection
                  title="Brands"
                  items={organizedBrands.slice(0, 3)}
                  selectedIds={selectedBrandIds}
                  toggleId={toggleBrandId}
                  getItemName={(item) => item.name}
                />
              )}
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
  );
};

export default MobileFiltersModal;
