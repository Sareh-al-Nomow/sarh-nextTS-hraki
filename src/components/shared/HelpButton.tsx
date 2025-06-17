"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestion, FaPhone, FaTimes } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

export default function FloatingCallButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCallPanel, setShowCallPanel] = useState(false);

  // Animation config
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  };

  // Main button variants
  const buttonVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#023047", // Dark blue
      transition: spring,
    },
    active: {
      scale: 1.1,
      backgroundColor: "#219EBC", // Teal
      transition: spring,
    },
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) setShowCallPanel(false);
  };

  const initiateCall = () => {
    setShowCallPanel(true);
    setIsOpen(false);
  };

  const closeAll = () => {
    setIsOpen(false);
    setShowCallPanel(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[50] font-sans">
      {/* Call Panel */}
      <AnimatePresence>
        {showCallPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-800 font-semibold text-lg">
                  Call Support
                </h3>
                <button
                  onClick={closeAll}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <p className="text-gray-600 mb-6 text-base">
                Speak directly with our support team by phone.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-lg text-white font-medium bg-green-500 hover:bg-green-600 transition-colors"
              >
                <a
                  href="tel:00962791986721"
                  className="flex items-center justify-center gap-2"
                >
                  <FaPhone size={16} />
                  Call Now
                </a>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Option Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-24 right-0"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={initiateCall}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg pl-5 pr-6 py-3 flex items-center gap-3 cursor-pointer"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <FaPhone size={18} />
              </div>
              <span className="font-medium">Call Support</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-lg"
        variants={buttonVariants}
        animate={isOpen ? "active" : "inactive"}
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Call support"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 180, opacity: 1 }}
              exit={{ rotate: 0, opacity: 0 }}
              transition={spring}
            >
              <FaTimes className="text-white text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="message-icon"
              initial={{ rotate: 20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -20, opacity: 0 }}
              transition={spring}
              className="relative"
            >
              <RiMessage2Fill className="text-white text-3xl" />
              <motion.div
                className="absolute -top-1 -right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  },
                }}
              >
                <FaQuestion className="text-blue-600 text-xs" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing ring effect */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-300 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
