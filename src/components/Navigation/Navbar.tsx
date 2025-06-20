"use client";

import SearchField from "./SearchField";
import CartLink from "./CartLink";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";
import PremiumNavWidget from "./PremiumNavWidget";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import Language from "./Languages";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        className="w-full bg-gradient-to-r from-[#1a7a9a] to-[#1e8cb5] text-white text-sm font-medium"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="container mx-auto px-4 py-2 text-center">
          🚀 Free shipping on all orders | Use code: waleed
        </div>
      </motion.div>

      {/* Main Header */}
      <header className="z-50 w-full bg-white shadow-sm">
        <div className="w-full px-2 lg:px-20">
          <nav
            dir="rtl"
            className="container mx-auto flex items-center justify-between py-4 gap-3 md:gap-5"
          >
            {/* Left - Logo */}
            <div className="flex items-center gap-1 md:gap-4">
              <div className="flex items-center md:hidden">
                <PremiumNavWidget />
              </div>
              <Link href={"/"} className="flex items-center z-10">
                <motion.div
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1a7a9a] to-[#1e8cb5] cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  SARAH
                </motion.div>
              </Link>
            </div>

            {/* Center - Search */}
            <div className="items-center flex-1">
              <SearchField />
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:block">
                <Language textColor="text-gray-600 hover:text-[#1a7a9a]" />
              </div>
              <div>
                {isAuthenticated ? <AccountLink /> : <RegistrationLink />}
              </div>
              <div className="h-5 w-[1px] rounded-2xl bg-gray-300" />
              <Link
                href={"/wishlist"}
                className="cursor-pointer hidden md:block"
              >
                <FaRegHeart className="font-bold text-gray-600 hover:text-[#1a7a9a] text-2xl transition-colors" />
              </Link>
              <div>
                <CartLink />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
