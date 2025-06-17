"use client";

import { SearchContext } from "@/store/SearchContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchField() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const router = useRouter();

  useEffect(() => {
    if (searchTerm.trim() === "") return; // تجاهل لو فاضي

    const timer = setTimeout(() => {
      router.push(`/shopGrid?query=${encodeURIComponent(searchTerm)}`);
    }, 500); // نصف ثانية

    return () => clearTimeout(timer); // يلغي المؤقت إذا المستخدم كتب من جديد
  }, [router, searchTerm]);

  return (
    <div className="w-full relative ">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder={t("searchPlaceholder")}
        dir={isRtl ? "rtl" : "ltr"}
        className="w-full p-2 px-3 md:px-5  text-[15px] md:text-2xl shadow rounded-2xl bg-white focus:shadow-black/60 transition-all duration-200"
      />
      <FiSearch
        className={`absolute top-2 md:top-[12.5px]  md:text-2xl  ${isRtl ? "left-3" : "right-3"} text-gray-400`}
      />
    </div>
  );
}
