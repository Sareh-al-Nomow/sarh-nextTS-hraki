"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";

const EcommerceHeader = () => {
  const t = useTranslations("navbar.topHeader");
  const locale = useLocale();
  const isRTL = locale === "ar"; // Add other RTL languages if needed
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {isAnnouncementVisible && (
          <motion.div
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
              <motion.div
                className={`flex items-center gap-2 cursor-pointer ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
                whileHover={{ x: isRTL ? -2 : 2 }}
                onClick={() => (window.location.href = "#sale")}
              >
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                  {t("announcement.limited")}
                </span>
                <p className={isRTL ? "text-right" : "text-left"}>
                  {t("announcement.text")} <strong>ahmad</strong>
                </p>
                <FiArrowRight className={isRTL ? "mr-1 rotate-180" : "ml-1"} />
              </motion.div>

              <motion.button
                onClick={() => setIsAnnouncementVisible(false)}
                className="p-1 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.div
              className="h-0.5 bg-white/30 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EcommerceHeader;
