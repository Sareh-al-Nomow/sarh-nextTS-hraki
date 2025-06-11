"use client";

import SearchField from "./SearchField";
import CategoriesLink from "./CategoriesLink";
import { useContext } from "react";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/image/1.png";
import { FiHeart } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  return (
    <div className="w-full rounded-2xl shadow-lg lg:px-20 h-24 bg-pink-400">
      <nav
        dir="ltr"
        className="container m-auto flex items-center justify-between py-4"
      >
        {/* Left - Logo (25%) */}
        <div className="w-1/4 flex items-center">
          <Link href={"/"} className="flex items-center gap-3">
            <Image src={logo} alt="SARAH logo" width={120} height={50} />
          </Link>
        </div>
        {/* Center - Search (50%) */}
        <div className="w-2/4 hidden md:flex justify-center px-4">
          <div className="w-full">
            <SearchField />
          </div>
        </div>

        {/* Right - Categories Link (25%) */}
        <div className="w-1/4 flex justify-end">
          <div className="flex items-center gap-4 ">
            <CategoriesLink />
            <Link
              href="/wishlist"
              className="flex items-center gap-1 text-black hover:text-red-500"
            >
              <FiHeart size={28} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
