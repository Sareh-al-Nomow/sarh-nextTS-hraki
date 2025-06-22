import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Order } from "@/lib/models/orderModal";
import Modal from "../UI/Modal";

interface RetrunModalProp {
  order: Order;
  isOpenModal: boolean;
  toggleOpenModal: () => void;
}

const ReturnModal: React.FC<RetrunModalProp> = ({
  order,
  isOpenModal,
  toggleOpenModal,
}) => {
  const [returnStep, setReturnStep] = useState<"policy" | "items" | "reason">(
    "policy"
  );
  const [selectedItems, setSelectedItems] = useState<
    Record<number, { checked: boolean; quantity: number }>
  >({});
  const [returnReason, setReturnReason] = useState("");
  const [returnNote, setReturnNote] = useState("");
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  // Initialize selected items
  useEffect(() => {
    if (isOpenModal) {
      const initialSelection = order.items.reduce((acc, item) => {
        acc[item.order_item_id] = { checked: false, quantity: item.qty };
        return acc;
      }, {} as Record<number, { checked: boolean; quantity: number }>);
      setSelectedItems(initialSelection);
      setReturnStep("policy");
      setReturnReason("");
      setReturnNote("");
      setIsPolicyExpanded(false);
    }
  }, [isOpenModal, order.items]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedItems = { ...selectedItems };
    for (const key in newSelectedItems) {
      newSelectedItems[key].checked = e.target.checked;
    }
    setSelectedItems(newSelectedItems);
  };

  const handleItemCheck = (itemId: number, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], checked },
    }));
  };

  const adjustQuantity = (itemId: number, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId];
      const maxQty =
        order.items.find((i) => i.order_item_id === itemId)?.qty || 1;
      const newQuantity = Math.max(
        1,
        Math.min(maxQty, current.quantity + delta)
      );
      return {
        ...prev,
        [itemId]: { ...current, quantity: newQuantity },
      };
    });
  };

  const handleNextStep = () => {
    if (returnStep === "policy") {
      setReturnStep("items");
      return;
    }

    const hasSelectedItems = Object.values(selectedItems).some(
      (item) => item.checked
    );
    if (hasSelectedItems) {
      setReturnStep("reason");
    } else {
      toast.error("Please select at least one item to return");
    }
  };

  const handleSubmitReturn = () => {
    const returnData = {
      orderId: order.order_id,
      items: Object.entries(selectedItems)
        .filter(([, item]) => item.checked)
        .map(([id, item]) => ({
          order_item_id: Number(id),
          quantity: item.quantity,
        })),
      reason: returnReason,
      note: returnNote,
    };

    console.log("Return submitted:", returnData);
    toast.success("Return request submitted successfully");
    toggleOpenModal();
  };

  const reasons = [
    { id: "wrong_item", label: "Wrong Item" },
    { id: "defective", label: "Defective/Damaged" },
    { id: "not_as_described", label: "Not as Described" },
    { id: "no_longer_needed", label: "No Longer Needed" },
    { id: "wrong_size", label: "Wrong Size" },
    { id: "other", label: "Other" },
  ];

  return (
    <Modal open={isOpenModal} classesName="bg-white">
      <AnimatePresence mode="wait">
        {/* Policy Screen */}
        {returnStep === "policy" && (
          <motion.div
            key="policy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-8 w-full bg-white rounded-xl shadow-xl"
          >
            <motion.div className="text-center mb-6" variants={fadeIn}>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Return Policy
              </h2>
              <p className="text-gray-500">
                Before proceeding, please review our return policy
              </p>
            </motion.div>

            <motion.div className="space-y-4 mb-6" variants={fadeIn}>
              {[
                "30-day return window from delivery date",
                "Items must be unused and in original condition",
                "Free returns for defective or incorrect items",
                "Refunds processed within 3-5 business days",
                "Original shipping fees are non-refundable",
              ].map((policy, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  custom={index}
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">{policy}</p>
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {isPolicyExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-600 overflow-hidden"
                >
                  <p className="mb-2">Additional policy details:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Returns must include all original packaging</li>
                    <li>Final sale items are not eligible for return</li>
                    <li>Return shipping costs are customer`s responsibility</li>
                    <li>Refunds issued to original payment method</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setIsPolicyExpanded(!isPolicyExpanded)}
              className="text-sm text-blue-600 hover:text-blue-700 mb-6 flex items-center"
              whileTap={{ scale: 0.98 }}
            >
              {isPolicyExpanded ? "Show less" : "View complete policy details"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  isPolicyExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={handleNextStep}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              I Agree - Continue to Return
            </motion.button>
          </motion.div>
        )}

        {/* Items Selection Screen */}
        {returnStep === "items" && (
          <motion.div
            key="items"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-6 w-full bg-white rounded-xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                className="text-xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Select Items to Return
              </motion.h2>
              <motion.button
                onClick={toggleOpenModal}
                className="text-gray-400 hover:text-gray-500"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            <motion.div
              className="mb-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-gray-700">
                Order #{order.order_id}
              </h3>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className=" h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={
                    Object.values(selectedItems).every(
                      (item) => item.checked
                    ) && Object.values(selectedItems).length > 0
                  }
                  onChange={toggleSelectAll}
                />
                Select All
              </label>
            </motion.div>

            <motion.div
              className="space-y-3 max-h-96 overflow-y-auto pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {order.items.map((item, index) => (
                <motion.div
                  key={item.order_item_id}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="checkbox"
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={
                      selectedItems[item.order_item_id]?.checked || false
                    }
                    onChange={(e) =>
                      handleItemCheck(item.order_item_id, e.target.checked)
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start">
                      <motion.div
                        className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mr-3"
                        whileHover={{ scale: 1.03 }}
                      >
                        <Image
                          src={
                            item.product.images[0]?.origin_image ||
                            "/placeholder-product.jpg"
                          }
                          alt={item.product_name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          SKU: {item.product_sku}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Max: {item.qty}
                          </span>
                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                            <motion.button
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                              onClick={() =>
                                adjustQuantity(item.order_item_id, -1)
                              }
                              disabled={
                                selectedItems[item.order_item_id]?.quantity <= 1
                              }
                              whileTap={{ scale: 0.9 }}
                            >
                              -
                            </motion.button>
                            <span className="mx-2 text-sm w-8 text-center">
                              {selectedItems[item.order_item_id]?.quantity || 0}
                            </span>
                            <motion.button
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                              onClick={() =>
                                adjustQuantity(item.order_item_id, 1)
                              }
                              disabled={
                                selectedItems[item.order_item_id]?.quantity >=
                                item.qty
                              }
                              whileTap={{ scale: 0.9 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-6 pt-4 border-t border-gray-200 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => setReturnStep("policy")}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                onClick={handleNextStep}
                disabled={
                  !Object.values(selectedItems).some((item) => item.checked)
                }
                className={`px-4 py-2 rounded-md text-white ${
                  Object.values(selectedItems).some((item) => item.checked)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                whileHover={{
                  scale: Object.values(selectedItems).some(
                    (item) => item.checked
                  )
                    ? 1.02
                    : 1,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Reason Screen */}
        {returnStep === "reason" && (
          <motion.div
            key="reason"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-6 w-full bg-white rounded-xl shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-900">
                  Return Details
                </h2>
                <p className="text-sm text-gray-500">Order #{order.order_id}</p>
              </motion.div>
              <motion.button
                onClick={toggleOpenModal}
                className="text-gray-400 hover:text-gray-500"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-gray-700 mb-3">Selected Items</h3>
              <div className="space-y-2 mb-4">
                {order.items
                  .filter((item) => selectedItems[item.order_item_id]?.checked)
                  .map((item, index) => (
                    <motion.div
                      key={item.order_item_id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      variants={itemVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 mr-3">
                          <Image
                            src={
                              item.product.images[0]?.origin_image ||
                              "/placeholder-product.jpg"
                            }
                            alt={item.product_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {item.product_name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        Qty: {selectedItems[item.order_item_id]?.quantity}
                      </span>
                    </motion.div>
                  ))}
              </div>

              <h3 className="font-medium text-gray-700 mb-3">
                Reason for Return*
              </h3>
              <motion.div
                className="grid grid-cols-2 gap-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {reasons.map((reason, index) => (
                  <motion.button
                    key={reason.id}
                    className={`py-2 px-3 rounded-md border text-sm font-medium ${
                      returnReason === reason.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setReturnReason(reason.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    custom={index}
                    variants={itemVariants}
                  >
                    {reason.label}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="return-note"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="return-note"
                  rows={3}
                  className="w-full text-black p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Please provide any additional details about your return..."
                  value={returnNote}
                  onChange={(e) => setReturnNote(e.target.value)}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-4 border-t border-gray-200 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setReturnStep("items")}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
              <motion.button
                onClick={handleSubmitReturn}
                disabled={!returnReason}
                className={`px-4 py-2 rounded-md text-white ${
                  returnReason
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                whileHover={{
                  scale: returnReason ? 1.02 : 1,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Return Request
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ReturnModal;
