"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "@/lib/models/productsModal";
import Spinner from "../../UI/SpinnerLoading";
import { getProducts } from "@/lib/axios/getProductsAxios";

import HorizontalProductList from "./HorizontalProductList";
import { transformProduct } from "@/utils/trnsformProduct";

export default function ProductsLists() {
  const { data, isLoading, isError, refetch } = useQuery<
    ProductsResponse,
    Error
  >({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(undefined, signal),
  });

  const displayedProducts = data?.data?.map(transformProduct).reverse() || [];

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="my-40">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500"> Failed to load products</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50">
      <HorizontalProductList title="Best  Saller" products={displayedProducts} />
      <HorizontalProductList
        title="Suggestion for you"
        products={displayedProducts}
      />
      <HorizontalProductList title="Children" products={displayedProducts} />
    </div>
  );
}
