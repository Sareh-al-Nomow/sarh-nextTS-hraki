"use client";

import SearchField from "./SearchField";
import CartLink from "./CartLink";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";
import PremiumNavWidget from "./PremiumNavWidget";
import { BsList } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const t = useTranslations("navbar");

  return (
    <header className="z-50 w-full shadow bg-white">
      <div className="w-full lg:px-20">
        <nav
          dir="ltr"
          className="container mx-auto flex items-center justify-between py-4"
        >
          {/* Left - Logo */}
          <Link href={"/"} className="flex items-center gap-3 mx-3 z-10">
            <div className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#219EBC] to-[#023047] cursor-pointer">
              SARAH
            </div>
          </Link>

          {/* Center - Search */}
          <div className="hidden md:flex items-center gap-5">
            <SearchField />
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* <span className="text-sm border px-3 py-1 rounded-lg pr-text cursor-pointer">
              JOD
            </span> */}
            {isAuthenticated ? <AccountLink /> : <RegistrationLink />}
            <CartLink />
            <BsList
              className="text-3xl hidden pr-text cursor-pointer"
              aria-label="Menu"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-5 mx-3">
            <span className="hidden md:flex cursor-pointer pr-text font-bold hover:text-[#219EBC] text-[23px] mt-1">
              {t("home")}
            </span>
            <PremiumNavWidget />
          </div>
        </nav>
      </div>
    </header>
  );
}
