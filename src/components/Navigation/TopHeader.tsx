"use client";

import React from "react";
import Language from "./Languages";
import { useTranslations } from "next-intl";

const TopHeader: React.FC = () => {
  const t = useTranslations("topHeader");

  return (
    <div className="lg:block pr-bg relative z-40 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-1">
        <div className="flex items-center justify-between gap-2 py-2 text-xs font-medium text-gray-700 font-sans">
          {/* Left side */}
          <div className="flex-wrap items-center gap-1 sm:gap-2 text-center sm:text-left justify-center sm:justify-start w-full sm:w-auto">
            <div className="hidden md:block">
              <div className=" text-[13px] md:text-sm text-gray-300 whitespace-nowrap">
                {t("available")}
              </div>
            </div>
            <div className="flex items-center gap-2">
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
              <a
                href="tel:+962779523688"
                className="font-bold text-white text-[13px] md:text-sm whitespace-nowrap"
              >
                {t("phone")}
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full sm:w-auto flex justify-end sm:justify-end mt-1 sm:mt-0">
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
