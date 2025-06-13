"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/axios/OrderAxios";
import Spinner from "@/components/UI/SpinnerLoading";
import type { Order } from "@/lib/models/orderModal";
import toast from "react-hot-toast";
import { BsBorderStyle } from "react-icons/bs";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  console.log(data);
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return <FiClock className="text-yellow-500" />;
      case "shipped":
        return <FiTruck className="text-blue-500" />;
      case "delivered":
        return <FiCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FiX className="text-red-500" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  if (isLoading) {
    return (
      <div className="my-40 mt-56">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-red-500"> {error.name}</h3>
        <p className="py-10">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        <p>No Data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">
            View and manage your order history
          </p>
        </div>

        {/* Status Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                activeTab === "processing"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiClock size={14} />
              Processing
            </button>
            <button
              onClick={() => setActiveTab("shipped")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                activeTab === "shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiTruck size={14} />
              Shipped
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                activeTab === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiCheckCircle size={14} />
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No orders found
              </h3>
              <p className="mt-1 text-gray-500">
                You dont have any {activeTab === "all" ? "" : activeTab} orders
                yet.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.order_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Order Header */}
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
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Order #{order.order_id}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium">
                      ${order.grand_total.toFixed(2)}
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

                {/* Order Details */}
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
                        <h4 className="font-medium mb-3">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.order_item_id}
                              className="flex items-start"
                            >
                              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={item.product.images[0].origin_image}
                                  alt={item.product_name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="font-medium text-gray-900">
                                  {item.product_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.qty}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(item.product_price * item.qty).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {order.order_number && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                              <BsBorderStyle className="text-blue-500" />
                              Summary
                            </h4>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              {/* Order Number */}
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">
                                  Price:
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  ${order.sub_total}
                                </span>
                              </div>

                              {/* Shipping Method */}
                              {order.shipping_method_name && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Shipping:
                                  </span>
                                  <span className="text-sm font-semibold text-gray-900">
                                    ${order.shipping_fee_incl_tax}
                                  </span>
                                </div>
                              )}

                              {/* Order Discount */}
                              {order.shipping_method_name && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Discount:
                                  </span>
                                  <span className="text-sm text-red-300 line-through">
                                    ${order.discount_amount ?? 0}
                                  </span>
                                </div>
                              )}

                              {/* Carrier */}
                              {order.grand_total && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Total:
                                  </span>
                                  <span className="text-sm font-semibold text-green-600">
                                    ${order.grand_total}
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
                              Tracking Information
                            </h4>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              {/* Order Number */}
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">
                                  Order Number:
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {order.order_number}
                                </span>
                              </div>

                              {/* Shipping Method */}
                              {order.shipping_method_name && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Shipping Method:
                                  </span>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {order.shipping_method_name}
                                  </span>
                                </div>
                              )}

                              {/* Carrier */}
                              {order.shipments?.[0]?.carrier && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Carrier:
                                  </span>
                                  <span className="text-sm font-semibold text-gray-900">
                                    {order.shipments[0].carrier}
                                  </span>
                                </div>
                              )}

                              {/* Tracking Number */}
                              {order.shipments?.[0]?.tracking_number && (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    Tracking #:
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
                                        toast.success("Tracking Number Copied");
                                      }}
                                      className=" cursor-pointer text-[18px] underline text-blue-500 hover:underline"
                                    >
                                      Copy
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                          {order.status === "delivered" && (
                            <button className="ml-3 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-700">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
