"use client";

import { getCartByToken } from "@/lib/axios/CartAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

export type Cart = {
  cart_id: number;
  currency: string | null;
  customer_id: number;
  customer_group_id: number | null;
  customer_email: string;
  customer_full_name: string;
  status: boolean;
  coupon: string | null;
  shipping_fee_excl_tax: number | null;
  shipping_fee_incl_tax: number | null;
  discount_amount: number | null;
  sub_total: number;
  sub_total_incl_tax: number;
  sub_total_with_discount: number;
  sub_total_with_discount_incl_tax: number;
  total_qty: number;
  total_weight: number;
  tax_amount: number;
  tax_amount_before_discount: number;
  shipping_tax_amount: number;
  grand_total: number;
  shipping_method: string | null;
  shipping_method_name: string | null;
  shipping_zone_id: number | null;
  shipping_address_id: number | null;
  payment_method: string | null;
  payment_method_name: string | null;
  billing_address_id: number | null;
  shipping_note: string | null;
  created_at: string;
  updated_at: string;
  total_tax_amount: number;
  user_id: number;
  items: CartItem[];
};

export interface CartItem {
  cart_item_id: number;
  uuid: string;
  cart_id: number;
  product_id: number;
  product_sku: string;
  product_name: string;
  image: string;
  product_weight: number;
  product_price: number;
  product_price_incl_tax: number;
  qty: number;
  final_price: number;
  final_price_incl_tax: number;
  tax_percent: number;
  tax_amount: number;
  tax_amount_before_discount: number;
  discount_amount: number;
  line_total: number;
  line_total_with_discount: number;
  line_total_incl_tax: number;
  line_total_with_discount_incl_tax: number;
  variant_group_id: number | null;
  variant_options: unknown | null;
  product_custom_options: unknown | null;
  created_at: string;
  updated_at: string;
  product: {
    description: {
      url_key: string;
    };
  };
}

export interface SummaryCart {
  subTotal: number;
  grandTotal: number;
  discount: number | null;
  tax: number;
  shippingFee: number | null;
}

interface CartContextType {
  cartQuantity: number;
  cartItems: CartItem[];
  summaryCart: SummaryCart;
}

export const CartContext = createContext<CartContextType>({
  cartQuantity: 0,
  cartItems: [],
  summaryCart: {
    subTotal: 0,
    grandTotal: 0,
    discount: null,
    tax: 0,
    shippingFee: null,
  },
});

type CartContextProviderProps = {
  children: React.ReactNode;
};
const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summaryCart, setSummaryCart] = useState<SummaryCart>({
    subTotal: 0,
    grandTotal: 0,
    discount: null,
    tax: 0,
    shippingFee: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartByToken,
  });

  const {} = useMutation({});

  console.log(data);
  console.log(error?.message);

  return (
    <CartContext.Provider value={{ cartQuantity, cartItems, summaryCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
