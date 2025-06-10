"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsResponse, Product } from "@/lib/models/productsModal";
import Spinner from "../../UI/SpinnerLoading";
import { FrontendProduct } from "@/models/forntEndProduct";
import { getProducts } from "@/lib/axios/getProductsAxios";

import HorizontalProductList from "./HorizontalProductList";

function transformProduct(product: Product): FrontendProduct {
  return {
    uuid: product.uuid,
    categoryId: product.category_id,
    id: product.product_id,
    name: product.description?.name || "Unnamed Product",
    price: product.price ?? 0,
    originalPrice: product.old_price
      ? `$${product.old_price.toFixed(2)}`
      : undefined,
    image:
      product.images?.find((img) => img.is_main)?.single_image ||
      product.images?.[0]?.single_image ||
      "/placeholder-product.jpg",
    rating: product.meanRating || 0,
    description: product.description?.description || "",
    shortDescription: product.description?.short_description || "",
    isNew:
      new Date(product.created_at) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    colors: product.attributes
      ?.filter((attr) => attr.attribute?.attribute_code === "color")
      .map((attr) => attr.option_text),
    tags: [
      !product.inventory?.stock_availability ? "OUT OF STOCK" : undefined,
      product.old_price ? "SALE" : undefined,
      new Date(product.created_at) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ? "NEW"
        : undefined,
    ].filter(Boolean) as string[],
    inventory: {
      stock_availability: product.inventory?.stock_availability || false,
      qty: product.inventory?.qty || 0,
    },
    images: product.images?.map((img) => ({
      single_image: img.single_image,
      thumb_image: img.thumb_image,
    })),
    attributes: product.attributes?.map((attr) => ({
      attribute_name: attr.attribute?.attribute_name,
      option_text: attr.option_text,
    })),
    createdAt: product.created_at,
  };
}

export default function ProductsLists() {
  const { data, isLoading, isError, refetch } = useQuery<
    ProductsResponse,
    Error
  >({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts(undefined, signal),
  });

  const displayedProducts = data?.data?.map(transformProduct) || [];

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  if (isLoading) {
    return (
      <div>
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
      <HorizontalProductList title="Best Saller" products={displayedProducts} />
      <HorizontalProductList
        title="Suggestion for you"
        products={displayedProducts}
      />
      <HorizontalProductList title="Children" products={displayedProducts} />
    </div>
  );
}
