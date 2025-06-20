"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight } from "react-icons/fi";

const EcommerceHeader = () => {
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
          >
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ x: 2 }}
                onClick={() => (window.location.href = "#sale")}
              >
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                  LIMITED
                </span>
                <p>
                  Summer Sale! Get 25% off on all items. Use code:{" "}
                  <strong>SUNNY25</strong>
                </p>
                <FiArrowRight className="ml-1" />
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
