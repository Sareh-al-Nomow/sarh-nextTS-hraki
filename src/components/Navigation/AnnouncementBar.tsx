"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import BecomeVendor from "./BecomeVendor";

export default function AnnouncementBar() {
  const t = useTranslations("navbar.AnnouncementBar");
  const locale = useLocale();
  const isRTL = locale === "ar"; // Add other RTL languages as needed

  return (
    <motion.div
      className="w-full bg-gradient-to-r from-[#1a7a9a] to-[#1e8cb5] text-white text-sm font-medium"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`container mx-auto px-2 sm:px-4 py-1 flex justify-between items-center`}
      >
        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className="mr-2">🚀</span>
          <span>
            {t("message")} <strong>hraki</strong>
          </span>
        </div>
        <BecomeVendor />
      </div>
    </motion.div>
  );
}
