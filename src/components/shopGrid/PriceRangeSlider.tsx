"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface PriceRangeSliderProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  MAX_PRICE: number;
  isMobile?: boolean;
}

const PriceRangeSlider = ({
  priceRange,
  setPriceRange,
  MAX_PRICE,
  isMobile = false,
}: PriceRangeSliderProps) => {
  const t = useTranslations("shopGrid.PriceRangeSlider");
  const locale = useLocale();
  const isRTL = locale === "ar"; // Add other RTL languages as needed

  const [activeHandle, setActiveHandle] = useState<null | "min" | "max">(null);

  const handleMouseDown = (handle: "min" | "max") => {
    setActiveHandle(handle);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeHandle) return;

      const slider = document.querySelector(".price-slider") as HTMLElement;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
      const newValue = Math.round(percentage * MAX_PRICE);

      if (activeHandle === "min") {
        setPriceRange([Math.min(newValue, priceRange[1] - 1), priceRange[1]]);
      } else {
        setPriceRange([priceRange[0], Math.max(newValue, priceRange[0] + 1)]);
      }
    };

    const handleMouseUp = () => {
      setActiveHandle(null);
    };

    if (activeHandle) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeHandle, priceRange, setPriceRange, MAX_PRICE]);

  return (
    <div className="mb-8" dir={isRTL ? "rtl" : "ltr"}>
      <h4 className="font-medium mb-4 text-gray-700">{t("title")}</h4>
      <div className="space-y-4">
        {!isMobile && (
          <div className="relative h-2 bg-gray-200 rounded-full price-slider">
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                right: `${100 - (priceRange[1] / MAX_PRICE) * 100}%`,
              }}
            />
            <div
              className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md hover:bg-blue-700 transition-colors"
              style={{ left: `${(priceRange[0] / MAX_PRICE) * 100}%` }}
              onMouseDown={() => handleMouseDown("min")}
            />
            <div
              className="absolute h-4 w-4 bg-blue-600 rounded-full -top-1 transform -translate-x-1/2 cursor-pointer shadow-md hover:bg-blue-700 transition-colors"
              style={{ left: `${(priceRange[1] / MAX_PRICE) * 100}%` }}
              onMouseDown={() => handleMouseDown("max")}
            />
          </div>
        )}
        <div
          className="flex justify-between gap-3 "
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium ">{t("minLabel")}</span>
            <input
              type="number"
              min="0"
              max={priceRange[1] - 1}
              value={priceRange[0]}
              onChange={(e) => {
                const value = Math.min(
                  parseInt(e.target.value) || 0,
                  priceRange[1] - 1
                );
                setPriceRange([value, priceRange[1]]);
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t("maxLabel")}</span>
            <input
              type="number"
              min={priceRange[0] + 1}
              max={MAX_PRICE}
              value={priceRange[1]}
              onChange={(e) => {
                const value = Math.max(
                  parseInt(e.target.value) || MAX_PRICE,
                  priceRange[0] + 1
                );
                setPriceRange([priceRange[0], value]);
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
