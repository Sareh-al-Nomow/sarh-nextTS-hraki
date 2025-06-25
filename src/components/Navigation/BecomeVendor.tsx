"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function BecomeVendor() {
  const t = useTranslations("navbar.BecomeVendor");
  return (
    <>
      <Link
        href={"/becomeVendor"}
        className="px-2 py-1 bg-white text-[#1a7a9a] rounded-md hover:bg-gray-100 transition-colors text-sm font-semibold"
      >
        {t("button")}
      </Link>
    </>
  );
}
