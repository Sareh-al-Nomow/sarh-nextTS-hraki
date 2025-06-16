// components/TopHeader.tsx
"use client";

import React from "react";
import Language from "./Languages";
import { useTranslations } from "next-intl";

const TopHeader: React.FC = () => {
  const t = useTranslations("topHeader");

  return (
    <div className="lg:block pr-bg relative z-100">
      <div className="max-w-screen-2xl mx-10 py-1">
        <div className="flex flex-row items-center justify-between py-2 text-xs font-medium text-gray-700 font-sans">
          <div className="flex items-center space-x-2">
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
            <div className="text-[13px] md:text-sm text-gray-300 whitespace-nowrap ">
              {t("available")}
            </div>
            <a
              href="tel:+962779523688"
              className="font-bold text-white text-[13px] md:text-sm whitespace-nowrap"
            >
              {t("phone")}
            </a>
          </div>

          <div className="ml-5 flex items-center space-x-3">
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
