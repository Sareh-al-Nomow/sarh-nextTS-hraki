"use client";

import Carousel from "@/components/homePage/Carousel";
import CategoriesList from "@/components/homePage/CategoriesList";
import Collections from "@/components/homePage/products/Collections";
import Products from "@/components/homePage/products/Products";
import Spinner from "@/components/UI/SpinnerLoading";
import { getCollections } from "@/lib/axios/collectionsAxios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

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

  if (data?.collections?.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No Collection available</p>
      </div>
    );
  }

  const collections = data?.collections?.filter(
    (collection) => collection.type === "section"
  );

  const banners = data?.collections?.filter(
    (collection) => collection.type === "banner"
  );

  // Debugging logs - remove in production
  console.log("All collections:", data?.collections);

  return (
    <>
      <Carousel collections={banners} />
      <CategoriesList />
      <Collections collections={collections} />
      <Products />
    </>
  );
}
