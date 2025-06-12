// components/TopHeader.tsx
"use client";
import RegistrationLink from "./RegistrationLink";
import AccountLink from "./AccountLink";
import { AuthContext } from "@/store/AuthContext";
import React, { useContext } from "react";
import Language from "./Language";
import CartLink from "./CartLink";

import { BsList } from "react-icons/bs";

const TopHeader: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="lg:block bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-1">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 text-xs font-medium text-gray-700 font-sans">
          {/* Left: Support Info - يأخذ العرض الكامل على الشاشات الصغيرة */}
          <div className="w-full md:w-auto flex items-center space-x-1 mb-2 md:mb-0">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-emerald-600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className="text-base ml-2">
              We are available 24/7, Need help?
            </div>
            <a
              href="tel:+96550531291"
              className="font-bold text-pink-400 text-sm"
            >
              +962 779 523 688
            </a>
          </div>

          {/* Right: Links - بمحاذاة اليسار مع مسافة بين العناصر */}
          <div className="w-full md:w-auto flex justify-between md:justify-start items-center space-x-2 md:space-x-4">
            <Language />
            <span className="hidden md:inline-block mx-2">|</span>
            {isAuthenticated ? <AccountLink /> : <RegistrationLink />}
            <CartLink />
            <BsList
              className="text-3xl hidden pr-text cursor-pointer"
              aria-label="Menu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
