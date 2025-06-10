import Spinner from "@/components/UI/SpinnerLoading";
import { getCategories } from "@/lib/axios/categoryAxios";
import { organizeCategories } from "@/utils/organizeCategories";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { FiChevronRight } from "react-icons/fi";

// interface CategoryFilterProps {}

const CategoryFilter: React.FC = ({}) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    []
  );

  const { data: DataCategories, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoadingCategory) {
    return <Spinner />;
  }

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCategoryId = (categoryId: number) => {
    setSelectedCategoriesIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
    console.log(categoryId);
  };
 
  const viewCategory =
    DataCategories && organizeCategories(DataCategories.data);
  console.log(viewCategory);

  return (
    <div>
      <h4 className="font-medium mb-4 text-gray-700">Categories</h4>
      <div className="space-y-2">
        {viewCategory?.parentsWithChildren.map((category) => (
          <div key={category.description.name} className="space-y-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-between w-full text-left ${
                category.children ? "font-semibold" : ""
              }`}
              onClick={() =>
                category.children
                  ? toggleCategoryExpansion(category.description.name)
                  : toggleCategory(category.description.name)
              }
            >
              <span
                className={
                  selectedCategories.includes(category.description.name)
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
                    const fullCategoryPath = `${category.description.name}/${subcategory}`;
                    return (
                      <motion.label
                        key={subcategory.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center group cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
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
                            selectedCategories.includes(fullCategoryPath)
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
        {viewCategory?.parentsWithoutChildren.map((category) => {
          // const fullCategoryPath = `${category.description.name}/${category}`;
          return (
            <motion.label
              key={category.id}
              whileTap={{ scale: 0.95 }}
              className="flex items-center group cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCategoriesIds.includes(category.id)}
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
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
