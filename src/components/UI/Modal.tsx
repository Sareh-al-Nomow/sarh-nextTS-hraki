"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  classesName?: string;
}

const Modal: React.FC<ModalProps> = ({ children, open, classesName }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("root-modal"));
  }, []);

  if (!modalRoot || !open) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50  flex items-center shadow-xl justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-[80%] md:w-[50%] lg:w-[40%] xl:w-[40%]  text-white rounded-2xl shadow-2xl  flex justify-center ${classesName}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>,
    modalRoot
  );
};

export default Modal;
