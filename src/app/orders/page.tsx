"use client";

import { useState } from "react";
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

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  trackingNumber?: string;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Sample orders data
  const orders: Order[] = [
    {
      id: "ORD-78910",
      date: "2023-05-15",
      status: "delivered",
      items: [
        {
          id: "item-1",
          name: "Wireless Headphones Pro",
          image: "/image/products/img-1.jpg",
          price: 199.99,
          quantity: 1,
        },
        {
          id: "item-2",
          name: "Phone Case",
          image: "/image/products/img-1.jpg",
          price: 29.99,
          quantity: 2,
        },
      ],
      total: 259.97,
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-12345",
      date: "2023-06-20",
      status: "shipped",
      items: [
        {
          id: "item-3",
          name: "Smart Watch Series 5",
          image: "/image/products/img-1.jpg",
          price: 249.99,
          quantity: 1,
        },
      ],
      total: 249.99,
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-45678",
      date: "2023-06-25",
      status: "processing",
      items: [
        {
          id: "item-4",
          name: "Bluetooth Speaker",
          image: "/image/products/img-1.jpg",
          price: 89.99,
          quantity: 1,
        },
        {
          id: "item-5",
          name: "USB-C Cable",
          image: "/image/products/img-1.jpg",
          price: 19.99,
          quantity: 3,
        },
      ],
      total: 149.96,
    },
  ];

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
                key={order.id}
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
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <motion.div
                      animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown className="ml-2 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
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
                            <div key={item.id} className="flex items-start">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {order.trackingNumber && (
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <h4 className="font-medium mb-2">
                              Tracking Information
                            </h4>
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center">
                                <FiTruck className="text-blue-500 mr-2" />
                                <span className="text-sm font-medium">
                                  Tracking #: {order.trackingNumber}
                                </span>
                              </div>
                              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                Track Order
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                            View Invoice
                          </button>
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
