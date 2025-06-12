"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../UI/SpinnerLoading";

import { getCollections } from "@/lib/axios/collectionsAxios";
import CollectionList from "./CollectionList";

export default function Collections() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getCollections,
  });

  console.log(data);

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

  if (data?.collections.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No Collection available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50">
      {data?.collections.map((collection) => (
        <CollectionList
          key={collection.collection_id}
          collection={collection}
        />
      ))}
    </div>
  );
}
