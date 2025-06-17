"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiHeart,
  FiLogOut,
  FiChevronDown,
  FiShoppingBag,
} from "react-icons/fi";
import { AuthContext } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PremiumUserMenu() {
  const t = useTranslations("accountCard");

  const { user, logout } = useContext(AuthContext);
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
    { icon: <FiUser size={18} />, label: t("Profile"), path: "/profile" },
    { icon: <FiShoppingBag size={18} />, label: t("Orders"), path: "/orders" },
    { icon: <FiHeart size={18} />, label: t("wishlist"), path: "/wishlist" },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Premium User Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-full transition-all"
        aria-label="User menu"
      >
        <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User avatar"
              fill
              className="object-cover"
            />
          ) : (
            <FiUser className="text-[#d0e3ec]" size={23} />
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-[#d0e3ec]" size={18} />
        </motion.div>
      </motion.button>

      {/* Luxury Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {/* User Profile Section */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-600" size={18} />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user?.full_name || "Guest"}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[180px]">
                  {user?.email || "Sign in to your account"}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <motion.div key={item.path} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-100">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="text-red-400" size={18} />
                <span>{t("SignOut")}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
