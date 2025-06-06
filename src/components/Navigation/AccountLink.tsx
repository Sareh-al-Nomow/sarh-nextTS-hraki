"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiSettings,
  FiHeart,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { AuthContext } from "@/store/AuthContext";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <FiUser />, label: "My Profile", path: "/profile" },
    { icon: <FiHeart />, label: "Saved Items", path: "/saved" },
    { icon: <FiSettings />, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full transition-colors"
      >
        <div className="w-8 h-8  rounded-full flex items-center justify-center">
          <FiUser className="pr-text text-2xl" />
        </div>
        <FiChevronDown
          className={`-translate-x-2 mt-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 pr-bg rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="font-medium text-white">Welcome back</p>
              <p className="text-sm text-white">user@example.com</p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                >
                  <span className="text-white">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 mb-1 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
