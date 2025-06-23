"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useCurrency } from "@/store/CurrencyContext";
import { useSettings } from "@/store/SettingsContext";

export default function CurrencySelector({
  textColor = "text-gray-800",
}: {
  textColor?: string;
}) {
  const { userCurrency, setUserCurrency } = useCurrency();
  const { available_currencies } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile width for dropdown alignment
  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleSelectCurrency = (currency: string) => {
    setUserCurrency(currency);
    setIsOpen(false);
    localStorage.setItem("currency", currency);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-1 rounded-md focus:outline-none ${textColor}`}
        aria-label="Select currency"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{userCurrency}</span>
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
            aria-label="Currency selector"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`absolute ${
              isMobile ? "left-0" : "left-0"
            } mt-2 w-full min-w-[120px] bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50`}
          >
            {available_currencies.map((currency) => (
              <motion.button
                key={currency}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectCurrency(currency)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  userCurrency === currency ? "bg-gray-100 font-semibold" : ""
                }`}
                role="menuitem"
              >
                {currency}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
