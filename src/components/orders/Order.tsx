"use client";

import { Order as OrderItem } from "@/lib/models/orderModal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsBorderStyle } from "react-icons/bs";
import { FiChevronDown, FiTruck } from "react-icons/fi";
import ReturnModal from "./ReturnModal";
import ProductItem from "./ProductItem";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/store/CurrencyContext";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface OrderProp {
  order: OrderItem;
  getStatusIcon: (status: OrderStatus) => React.ReactNode;
  getStatusColor: (status: OrderStatus) => string;
  setExpandedOrder: (orderId: number | null) => void;
  expandedOrder: number | null;
}

const Order: React.FC<OrderProp> = ({
  order,
  getStatusIcon,
  getStatusColor,
  setExpandedOrder,
  expandedOrder,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const t = useTranslations("orders.order");

  const { rate, userCurrency } = useCurrency();

  function viewPriceCurencyHandler(priceNumber: number) {
    const price = (Number(priceNumber) * rate).toFixed(2);
    return price ? price : 0;
  }

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <ReturnModal
        order={order}
        isOpenModal={isOpenModal}
        toggleOpenModal={toggleOpenModal}
      />
      <motion.div
        key={order.order_id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() =>
            setExpandedOrder(
              expandedOrder === order.order_id ? null : order.order_id
            )
          }
        >
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.status as OrderStatus
              )}`}
            >
              <div className="flex items-center gap-1">
                {getStatusIcon(order.status as OrderStatus)}
                <span className="capitalize">{t(`tabs.${order.status}`)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {t("orderId", { id: order.order_id })}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="font-medium">
              {userCurrency} {viewPriceCurencyHandler(order.grand_total ?? 0)}
            </p>
            <motion.div
              animate={{
                rotate: expandedOrder === order.order_id ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown className="ml-2 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {expandedOrder === order.order_id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-100 p-4">
                <h4 className="font-medium mb-3">{t("itemsTitle")}</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <ProductItem
                      key={item.order_item_id}
                      item={item}
                      orderStatus={order.status === "delivered"}
                    />
                  ))}
                </div>

                {order.order_number && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <BsBorderStyle className="text-blue-500" />
                      {t("summary")}
                    </h4>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          {t("summaryItems.price")}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {userCurrency}{" "}
                          {viewPriceCurencyHandler(order.sub_total ?? 0)}
                        </span>
                      </div>

                      {order.shipping_method_name && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("summaryItems.shipping")}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {userCurrency}{" "}
                            {viewPriceCurencyHandler(
                              order.shipping_fee_incl_tax ?? 0
                            )}
                          </span>
                        </div>
                      )}

                      {order.shipping_method_name && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("summaryItems.discount")}
                          </span>
                          <span className="text-sm text-red-300 line-through">
                            {userCurrency}{" "}
                            {viewPriceCurencyHandler(
                              order.discount_amount ?? 0
                            )}
                          </span>
                        </div>
                      )}

                      {order.grand_total && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("summaryItems.total")}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            {userCurrency}{" "}
                            {viewPriceCurencyHandler(order.grand_total ?? 0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {order.order_number && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <FiTruck className="text-blue-500" />
                      {t("tracking")}
                    </h4>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">
                          {t("trackingItems.orderNumber")}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {order.order_number}
                        </span>
                      </div>

                      {order.shipping_method_name && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("trackingItems.shippingMethod")}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {order.shipping_method_name}
                          </span>
                        </div>
                      )}

                      {order.shipments?.[0]?.carrier && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("trackingItems.carrier")}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {order.shipments[0].carrier}
                          </span>
                        </div>
                      )}

                      {order.shipments?.[0]?.tracking_number && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            {t("trackingItems.trackingNumber")}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {order.shipments[0].tracking_number}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  order.shipments[0].tracking_number
                                );
                                toast.success(t("trackingItems.copySuccess"));
                              }}
                              className=" cursor-pointer text-[18px] underline text-blue-500 hover:underline"
                            >
                              {t("trackingItems.copy")}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  {/* {order.status === "delivered" && ( */}
                  <h2
                    onClick={toggleOpenModal}
                    className="ml-3 px-4 py-2 pr-text rounded-md font-medium cursor-pointer"
                  >
                    {t("actions.return")}
                  </h2>
                  {/* // )} */}
                  {/* {order.status === "delivered" && ( */}
                  <button className="ml-3 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700">
                    {t("actions.buyAgain")}
                  </button>
                  {/* )} */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Order;
