"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { getLanguages } from "@/lib/axios/languagesAxios";
import { useLocale } from "next-intl";

export default function Language() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();
  const isRTL = locale === "ar";

  // Detect current locale from URL (assuming first path segment is locale)
  const currentLocale = pathname?.split("/")[1] || "en";

  // Find the current language name for display
  const currentLanguage = data?.data.find(
    (lang) => lang.languageCode === currentLocale
  );

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

  const handleSelectLanguage = (langCode: string) => {
    setIsOpen(false);

    // Replace locale segment with new langCode
    const segments = pathname?.split("/") || [];
    if (segments.length > 1) {
      segments[1] = langCode; // replace locale segment
    } else {
      segments.push(langCode); // fallback
    }
    const newPathname = segments.join("/") || `/${langCode}`;
    localStorage.setItem("lang", langCode);
    // Navigate to new locale path
    router.push(newPathname);
  };

  if (isLoading) {
    return <p>Loading ....</p>;
  }

  if (error) {
    return <p className="py-10">{(error as Error).message}</p>;
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-1  rounded-md focus:outline-none`}
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>
          {currentLanguage
            ? currentLanguage.languageName
            : currentLocale.toUpperCase()}
        </span>
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
            role="menu"
            aria-label="Language selector"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`absolute  ${isRTL ? "md:left-0" : "md:right-0"
              } mt-2 w-full min-w-[120px] bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50`}
          >
            {data?.data.map((lang) => (
              <motion.button
                key={lang.languageCode}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLanguage(lang.languageCode)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLocale === lang.languageCode
                  ? "bg-gray-100 font-semibold"
                  : ""
                  }`}
                role="menuitem"
              >
                {lang.languageName}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
