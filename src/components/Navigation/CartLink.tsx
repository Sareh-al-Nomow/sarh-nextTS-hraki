"use client";

import { CartContext } from "@/store/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function CartLink() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <Link href={"/cart"} className="relative mt-1">
      <IoCartOutline className={`pr-text text-4xl cursor-pointer`} />
      <div className="text-white absolute text-[13px]  -top-1 left-0 pr-bg rounded-full w-5 h-5 flex justify-center items-center">
        {cartQuantity ? cartQuantity : 0}
      </div>
    </Link>
  );
}
