"use client";

import Spinner from "@/components/UI/SpinnerLoading";
import { getOrders } from "@/lib/axios/OrderAxios";
import { OrderItem } from "@/lib/models/orderModal";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useMemo } from "react";
import ProductItem from "./ProductItem";
import { useTranslations } from "next-intl";

const MyProducts = () => {
  const t = useTranslations("account.myProducts");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const mergedItems = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const allItems = data.flatMap((order) => order.items || []);
    return allItems.reduce<OrderItem[]>((acc, item) => {
      const existingItem = acc.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
  }, [data]);

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
          {t("retry")}
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

  if (data.length === 0) {
    return (
      <div className="text-center py-10">
        <p>{t("noCollection")}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        {mergedItems.map((orderItem) => (
          <ProductItem key={orderItem.order_item_id} item={orderItem} />
        ))}
      </div>
    </motion.div>
  );
};

export default MyProducts;
