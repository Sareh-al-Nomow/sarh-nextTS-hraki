"use client";

import { useContext, useEffect, useState } from "react";
import SearchField from "./SearchField";
import CartLink from "./CartLink";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";
import PremiumNavWidget from "./PremiumNavWidget";
import { BsList } from "react-icons/bs";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Always show navbar when at top of page
      if (currentScrollPos === 0) {
        setVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else {
        setVisible(isScrollingUp || currentScrollPos < 100);
      }

      setPrevScrollPos(currentScrollPos);
    };

    // Set a small threshold to prevent flickering
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`w-full shadow lg:px-20 bg-white sticky top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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
          <span className="text-sm border px-3 py-1 rounded-lg pr-text cursor-pointer">
            JOD
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
          <PremiumNavWidget />
        </div>
      </nav>
    </div>
  );
}
