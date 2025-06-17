"use client";

import { getCategories } from "@/lib/axios/categoryAxios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../UI/SpinnerLoading";
import { useTranslations } from "next-intl";
import { organizeCategories } from "@/utils/organizeCategories";

export default function CategoriesList() {
  const t = useTranslations("category");
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const displayCategories = organizeCategories(categories?.data ?? []);

  console.log(categories?.data);

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

  return (
    <section className="px-4 py-6 md:py-10 text-center">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold pr-text mb-10 ">
          {t("title")}
        </h2>
        {!displayCategories.allParent && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-6">
            <h1> {t("noCategory")}</h1>
          </div>
        )}
        <div className="gap-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
            {displayCategories.allParent &&
              displayCategories.allParent.map((cat, index) => (
                <Link
                  href={`/shopGrid?categoryid=${cat.id}`}
                  key={index}
                  className="flex flex-col items-center text-center group w-24 sm:w-28 md:w-auto"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#fff] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={cat.description.image ?? "/image/products/img.png"}
                      alt={cat.description.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-sm sm:text-base font-bold pr-text group-hover:text-[#219EBC] transition-colors duration-300">
                    {cat.description.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
