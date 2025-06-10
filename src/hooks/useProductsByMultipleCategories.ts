// src/hooks/useProductsByMultipleCategories.ts
import { useQueries } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../lib/axios/getProductsAxios";
import { useMemo } from "react";
import { transformProduct } from "@/utils/trnsformProduct";

export const useProductsByMultipleCategories = (categoryIds: number[]) => {
  const queries = useQueries({
    queries: categoryIds.map((id) => ({
      queryKey: ["products", id],
      queryFn: () => fetchProductsByCategory(id),
      enabled: !!id, // تأكد إنه رقم صحيح
    })),
  });

  // دمج كل النتائج بمنتجات وحدة
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const products = queries.flatMap((q) => q.data?.data ?? []);

  const filteredProductsByCatedgoyiesIds = useMemo(() => {
    return products.map((p) => transformProduct(p));
  }, [products]);

  return { filteredProductsByCatedgoyiesIds, isLoading, isError };
};
