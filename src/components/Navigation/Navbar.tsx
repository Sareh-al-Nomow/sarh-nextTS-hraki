"use client";

import SearchField from "./SearchField";
import CartLink from "./CartLink";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";
import PremiumNavWidget from "./PremiumNavWidget";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
// import { useTranslations } from "next-intl";
import Language from "./Languages";
import { FaRegHeart } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  // const t = useTranslations("navbar");

  return (
    <header className="z-50 w-full shadow pr-bg">
      <div className="w-full px-3 lg:px-20">
        <nav
          dir="rtl"
          className="container mx-auto flex items-center justify-between py-4 gap-3 md:gap-5"
        >
          {/* Left - Logo */}
          <div className="flex items-center">
            {/* Navigation Links */}
            <div className="flex items-center gap-5 mx-3 md:hidden">
              <PremiumNavWidget />
            </div>
            <Link href={"/"} className="flex items-centerz-10">
              <div className="text-xl md:text-2xl  lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#229bd8] to-[#219EBC] cursor-pointer">
                SARAH
              </div>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="items-center flex-1">
            <SearchField />
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            <div className=" hidden md:block">
              <Language textColor="text-[#d0e3ec] hover:text-white" />
            </div>
            <div>
              {isAuthenticated ? <AccountLink /> : <RegistrationLink />}
            </div>
            <div className="h-5 w-[1px] rounded-2xl bg-[#d0e3ec]"></div>
            <Link
              href={"/wishlist"}
              className=" cursor-pointer hidden md:block"
            >
              <FaRegHeart className=" font-bold text-[#d0e3ec] text-2xl hover:text-white" />
            </Link>
            <div>
              <CartLink />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
