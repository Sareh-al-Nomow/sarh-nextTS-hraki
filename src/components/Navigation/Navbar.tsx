"use client";

import SearchField from "./SearchField";
import CartLink from "./CartLink";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";

import CategoriesLink from "./CategoriesLink";
import { BsList } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <div className="w-full shadow lg:px-20">
      <nav
        dir="ltr"
        className="container m-auto flex items-center justify-between py-4"
      >
        {/* Left */}
        <Link href={"/"} className="flex items-center gap-3 mx-3">
          <div className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#219EBC] to-[#023047] cursor-pointer">
            SARAH
          </div>
        </Link>

        {/* Center */}
        <div className="hidden md:flex items-center gap-5">
          <SearchField />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="text-sm border px-2 py-1 rounded-lg pr-text cursor-pointer ">
            USD
          </span>
          {isAuthenticated ? <AccountLink /> : <RegistrationLink />}
          <CartLink />
          <BsList
            className="text-3xl hidden pr-text cursor-pointer"
            aria-label="Menu"
          />
        </div>

        <div className="flex items-center gap-5 mx-3">
          <span className="hidden md:flex cursor-pointer pr-text hover:text-[#219EBC] text-[20px] mt-1">
            Home
          </span>
          <CategoriesLink />
        </div>
      </nav>
    </div>
  );
}
