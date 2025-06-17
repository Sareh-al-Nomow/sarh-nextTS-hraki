"use client";

import { CartContext } from "@/store/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function CartLink() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <Link href={"/cart"} className="relative mt-1 ">
      <IoCartOutline className={`text-white text-3xl cursor-pointer`} />
      <div className="pr-text absolute text-[13px] text-[#d0e3ec] hover:text-white -top-1 left-0 bg-white rounded-full w-5 h-5 flex justify-center items-center">
        {cartQuantity ? cartQuantity : 0}
      </div>
    </Link>
  );
}
