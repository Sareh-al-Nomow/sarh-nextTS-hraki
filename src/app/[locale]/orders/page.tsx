"use client";

import { useEffect, useState } from "react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiX,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/axios/OrderAxios";
import Spinner from "@/components/UI/SpinnerLoading";
import type { Order as OrderType } from "@/lib/models/orderModal";
import Order from "@/components/orders/Order";
import { useTranslations } from "next-intl";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export default function OrdersPage() {
  const t = useTranslations("orders");

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | OrderStatus>("all");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

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
        <h3 className="text-red-500">{error.name}</h3>
        <p className="py-10">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("error.retry")}
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        <p>{t("noData")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-600 mt-1">{t("description")}</p>
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
              {t("tabs.all")}
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
              {t("tabs.processing")}
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
              {t("tabs.shipped")}
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
              {t("tabs.delivered")}
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {t("empty.title")}
              </h3>
              <p className="mt-1 text-gray-500">
                {t("empty.description", {
                  status: activeTab === "all" ? "" : t(`tabs.${activeTab}`),
                })}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Order
                key={order.order_id}
                order={order}
                expandedOrder={expandedOrder}
                setExpandedOrder={setExpandedOrder}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
