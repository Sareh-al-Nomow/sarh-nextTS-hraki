"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function Language() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    // هنا يمكنك إضافة منطق تغيير اللغة الفعلي
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{selectedLanguage}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={18} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`absolute ${
              window.innerWidth < 768 ? "left-0" : "right-0"
            } mt-2 w-full min-w-[120px] bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50`}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLanguage(lang.label)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedLanguage === lang.label
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
                role="menuitem"
              >
                {lang.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
