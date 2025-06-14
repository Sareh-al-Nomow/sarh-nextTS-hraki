"use client";

import { SearchContext } from "@/store/SearchContext";
import {  useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchField() {
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
    <div className="w-full relative max-w-md">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="ابحث عن المنتجات..."
        className="w-full p-3 text-xl shadow rounded-full focus:shadow-black/60 transition-all duration-200"
      />
      <FiSearch className="absolute top-4 right-5 text-gray-400" />
    </div>
  );
}
