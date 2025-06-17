"use client";

import { CartContext } from "@/store/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function CartLink() {
  const { cartQuantity } = useContext(CartContext);
  const itemCount = cartQuantity || 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center p-2 rounded-md hover:bg-opacity-10 transition-colors duration-200"
      aria-label={`Shopping Cart with ${itemCount} items`}
    >
      <IoCartOutline className="text-white text-2xl md:text-3xl" />

      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
