import PriceRangeSlider from "./PriceRangeSlider";
import FilterSection from "./FilterSection";
import { Category } from "@/lib/models/categoryModal";
import { Brand } from "@/models/frontEndBrand";
import { useTranslations } from "next-intl";

export type PriceRange = [number, number];

interface FilterSidebarProps {
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

const FilterSidebar = ({
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
}: FilterSidebarProps) => {
  const t = useTranslations("shopGrid.FilterSidebar");

  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">{t("Filters")}</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {t("ResetAll")}
          </button>
        </div>

        <PriceRangeSlider
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          MAX_PRICE={MAX_PRICE}
        />

        {organizedCategories && (
          <FilterSection
            title="Categories"
            items={organizedCategories.allParent}
            selectedIds={selectedCategoriesIds}
            toggleId={toggleCategoryId}
            getItemName={(item) => item.description.name}
          />
        )}

        {organizedBrands.length > 0 && (
          <FilterSection
            title="Brands"
            items={organizedBrands}
            selectedIds={selectedBrandIds}
            toggleId={toggleBrandId}
            getItemName={(item) => item.name}
          />
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
