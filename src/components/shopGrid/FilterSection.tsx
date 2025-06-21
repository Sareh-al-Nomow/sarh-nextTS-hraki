import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";

interface FilterSectionProps<T> {
  title: string;
  items: T[];
  selectedIds: number[];
  toggleId: (id: number) => void;
  getItemName: (item: T) => string;
  showAllInitially?: boolean;
}

const FilterSection = <T extends { id: number }>({
  title,
  items,
  selectedIds,
  toggleId,
  getItemName,
  showAllInitially = false,
}: FilterSectionProps<T>) => {
  const [showAll, setShowAll] = useState(showAllInitially);

  return (
    <div className="mb-6">
      <h4 className="font-medium mb-4 text-gray-700 flex items-center justify-between">
        <span>{title}</span>
        {items.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </h4>

      <div className="space-y-2">
        {items.slice(0, showAll ? items.length : 3).map((item) => (
          <motion.label
            key={item.id}
            whileTap={{ scale: 0.95 }}
            className="flex items-center group gap-2 cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleId(item.id)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 border-2 border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-blue-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
                {selectedIds.includes(item.id) && (
                  <GoDotFill className="text-white" />
                )}
              </div>
            </div>
            <span
              className={`text-sm ${
                selectedIds.includes(item.id)
                  ? "text-blue-600"
                  : "text-gray-600"
              } group-hover:text-gray-900 transition-colors`}
            >
              {getItemName(item)}
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
