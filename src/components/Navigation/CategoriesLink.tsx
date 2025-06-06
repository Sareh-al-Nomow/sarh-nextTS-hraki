"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import Link from "next/link";

export default function CategoriesLink() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Sample data for the widget
  const categories = [
    {
      name: "Electronics",
      subcategories: ["Phones", "Laptops", "Accessories"],
    },
    { name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
    { name: "Home", subcategories: ["Furniture", "Decor", "Kitchen"] },
  ];

  return (
    <>
      {/* Your existing CategoriesLink with click handler */}
      <div
        className="flex gap-1 cursor-pointer"
        onClick={() => setIsWidgetOpen(true)}
      >
        <p className="text-[20px] pr-text"></p>
        <BsList className="w-8 h-8 mt-[5px] pr-text font-bold" />
      </div>

      {/* Off-Canvas Widget */}
      <AnimatePresence>
        {isWidgetOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setIsWidgetOpen(false)}
            />

            {/* Widget */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl"
            >
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold pr-text ">Menu</h2>
                <button
                  onClick={() => setIsWidgetOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Widget Content */}
              <div className="p-4 overflow-y-auto h-[calc(100%-60px)]  z-50">
                {/* Categories Section - More prominent now */}
                <section className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pr-text ">
                    All Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <button
                          onClick={() =>
                            setActiveCategory(
                              activeCategory === category.name
                                ? null
                                : category.name
                            )
                          }
                          className="w-full flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border pr-bg se-text"
                        >
                          <span className="font-medium se-text">
                            {category.name}
                          </span>
                          {activeCategory === category.name ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </button>

                        {activeCategory === category.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 mt-2"
                          >
                            {category.subcategories.map((sub) => (
                              <a
                                key={sub}
                                href="#"
                                className="block p-3 hover:bg-gray-50 rounded-lg pr-text "
                              >
                                {sub}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Additional Sections */}

                <section className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 pr-text ">
                    Help & Support
                  </h3>
                  <div className="space-y-3">
                    <div className="border-b pb-3">
                      <Link
                        href={"#"}
                        className="w-full text-left pr-text hover:text-blue-600 "
                      >
                        Pupulare Questions
                      </Link>
                    </div>

                    <div className="border-b pb-3">
                      <Link
                        href={""}
                        className="w-full text-left pr-text hover:text-blue-600 "
                      >
                        Contact Us
                      </Link>
                    </div>

                    <div className="border-b pb-3">
                      <Link
                        href={""}
                        className="w-full text-left pr-text hover:text-blue-600 "
                      >
                        About us
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
