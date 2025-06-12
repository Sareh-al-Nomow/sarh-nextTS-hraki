"use client";

import { getCategories } from "@/lib/axios/categoryAxios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../UI/SpinnerLoading";
import { organizeCategories } from "@/utils/organizeCategories";

export default function CategoriesList() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(categories);

  if (isLoading) {
    return (
      <div className="my-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20">
        <h1>{error.name}</h1>
        <h3>{error.message}</h3>
      </div>
    );
  }

  console.log(categories && organizeCategories(categories.data));

  return (
    <section className="px-4 py-6 md:py-10 text-center">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold pr-text mb-10 ">
          Browse Categories
        </h2>
        {!categories && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-6">
            <h1>There is No Avilable Categories</h1>
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {categories &&
            categories.data.map((cat, index) => (
              <Link
                href={`/shopGrid?categoryid=${cat.id}`}
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#fff] shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={cat.description.image}
                    alt={cat.description.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-lg font-bold text-gray-100 md:text-base pr-text group-hover:text-[#219EBC] transition-colors duration-300">
                  {cat.description.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
