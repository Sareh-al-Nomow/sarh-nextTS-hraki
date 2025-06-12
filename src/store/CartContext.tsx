"use client";

import {
  AddToCart,
  ApplyCoupon,
  DeleteAppliedCoupon,
  DeleteCartItem,
  getCartByToken,
  UpdateCartItemQuantity,
} from "@/lib/axios/CartAxios";
import { saveOrderData } from "@/lib/axios/OrderAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  cart_id: number;
  subTotal: number;
  grandTotal: number;
  discount: number | null;
  tax: number;
  shippingFee: number | null;
  coupon: string | null;
}

interface CartContextType {
  cartQuantity: number;
  cartItems: CartItem[];
  summaryCart: SummaryCart;
  margeItems: CartItem[];
  addToCart: (productId: number, qty?: number) => void;
  updateCartItemQuantity: (cart_item_id: number, qty?: number) => void;
  deleteCartItem: (cart_item_id: number) => void;
  applyCoupon: (coupon_code: string) => void;
  deleteAppliedCoupon: (coupon_code: number) => void;
  saveOrderInfo: (
    cartId: number,
    addressId: number,
    DelevaryMethodId: number
  ) => void;
  updateCart: () => void;

  cartError: string | null;
  getCartError: Error | null;
  isLoadingCart: boolean;
  isLoadingAddToCart: boolean;
  isLoadingUpdateCartQuantity: boolean;
  isLoadingDeleteCartItem: boolean;
  isLoadingApplyCoupon: boolean;
  isLoadingdeleteAppliedCoupon: boolean;

  isLoadingSaveOrderData: boolean;
  isErrorSaveOrderData: boolean;
}

export const CartContext = createContext<CartContextType>({
  cartQuantity: 0,
  cartItems: [],
  summaryCart: {
    cart_id: 0,
    coupon: "",
    subTotal: 0,
    grandTotal: 0,
    discount: null,
    tax: 0,
    shippingFee: null,
  },
  margeItems: [],
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  deleteCartItem: () => {},
  applyCoupon: () => {},
  deleteAppliedCoupon: () => {},
  saveOrderInfo: () => {},
  updateCart: () => {},
  cartError: null,
  getCartError: null,
  isLoadingCart: false,
  isLoadingAddToCart: false,
  isLoadingUpdateCartQuantity: false,
  isLoadingDeleteCartItem: false,
  isLoadingApplyCoupon: false,
  isLoadingdeleteAppliedCoupon: false,
  isLoadingSaveOrderData: false,
  isErrorSaveOrderData: false,
});

type CartContextProviderProps = {
  children: React.ReactNode;
};

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [margeItems, setMargeItems] = useState<CartItem[]>([]);
  const [summaryCart, setSummaryCart] = useState<SummaryCart>({
    cart_id: 0,
    subTotal: 0,
    grandTotal: 0,
    discount: null,
    coupon: "",
    tax: 0,
    shippingFee: null,
  });
  const [cartError, setCartError] = useState<string | null>(null);

  const {
    data,
    isLoading: isLoadingCart,
    refetch,
    error: getCartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartByToken,
  });

  const updateCartState = useCallback((cart: Cart) => {
    console.log("updated cart items  :", cart.items);
    setCartItems(cart.items);
    setCartQuantity(cart.total_qty);
    setSummaryCart({
      cart_id: cart.cart_id,
      subTotal: cart.sub_total,
      grandTotal: cart.grand_total,
      discount: cart.discount_amount,
      coupon: cart.coupon,
      tax: cart.tax_amount,
      shippingFee: cart.shipping_fee_incl_tax,
    });
    setCartError(null);
  }, []);

  useEffect(() => {
    if (data) {
      console.log("updated cart");
      updateCartState(data);
    }
  }, [data, updateCartState]);

  useEffect(() => {
    console.log("updated marged items");
    const finalList = mergeCartItems(cartItems);
    setMargeItems(finalList);
  }, [cartItems]);

  // ****************************** strat mutate section
  // add to cart Mutation
  const { mutate: addToCartMutate, isPending: isLoadingAddToCart } =
    useMutation({
      mutationFn: AddToCart,
      onSuccess: () => {
        refetch(); // لو بدك تحدث بيانات الكارت بعد الإضافة
        toast.success("your item added successflly!");
      },
      onError: (error: Error) => {
        setCartError(error.message);
      },
    });

  // update quanitity to cart Mutation
  const {
    mutate: updateCartItemQuantityMutate,
    isPending: isLoadingUpdateCartQuantity,
  } = useMutation({
    mutationFn: UpdateCartItemQuantity,
    onSuccess: () => {
      refetch(); // لو بدك تحدث بيانات الكارت بعد الإضافة
      toast.success("updated quantity item successflly!");
    },
    onError: (error: Error) => {
      setCartError(error.message);
    },
  });

  // delete cart item Mutation
  const { mutate: deleteCartItemMutate, isPending: isLoadingDeleteCartItem } =
    useMutation({
      mutationFn: DeleteCartItem,
      onSuccess: () => {
        refetch(); // لو بدك تحدث بيانات الكارت بعد الإضافة
        toast.success("deleted item successflly!");
      },
      onError: (error: Error) => {
        setCartError(error.message);
      },
    });

  // apply coupon Mutation
  const { mutate: applyCouponMutate, isPending: isLoadingApplyCoupon } =
    useMutation({
      mutationFn: ApplyCoupon,
      onSuccess: () => {
        refetch();
        toast.success("applied coupon successflly!");
      },
      onError: (error: Error) => {
        setCartError(error.message);
      },
    });

  // apply coupon Mutation
  const {
    mutate: deleteAppliedCouponMutate,
    isPending: isLoadingdeleteAppliedCoupon,
  } = useMutation({
    mutationFn: DeleteAppliedCoupon,
    onSuccess: () => {
      refetch();
      toast.success("delete applied coupon successflly!");
    },
    onError: (error: Error) => {
      setCartError(error.message);
    },
  });

  // Save order data (strat payment) Mutation
  const {
    mutate: saveOrderDataMutate,
    isPending: isLoadingSaveOrderData,
    isError: isErrorSaveOrderData,
  } = useMutation({
    mutationFn: saveOrderData,
    onSuccess: () => {
      refetch();
      toast.success("Address and Payment successflly!");
    },
    onError: (error: Error) => {
      setCartError(error.message);
    },
  });

  // ****************************** end mutate section

  // ****************************** strat actions section

  const addToCart = (productId: number, qty: number = 1) => {
    const exsistingItem = cartItems.find(
      (item) => item.product_id === productId
    );
    if (exsistingItem) {
      console.log("updated");
      console.log(exsistingItem);
      updateCartItemQuantityMutate({
        cart_item_id: exsistingItem.cart_item_id,
        qty: exsistingItem.qty + 1,
      });
    } else {
      console.log("add new");
      addToCartMutate({ productId, qty });
    }
  };

  const updateCartItemQuantity = (cart_item_id: number, qty: number = 1) => {
    console.log("conext update item : ", cart_item_id, qty);
    updateCartItemQuantityMutate({ cart_item_id, qty });
  };

  const deleteCartItem = (cart_item_id: number) => {
    deleteCartItemMutate({ cart_item_id });
  };

  const applyCoupon = (coupon_code: string) => {
    console.log("coupon at Context : ", coupon_code);
    applyCouponMutate({ coupon_code });
  };

  const deleteAppliedCoupon = (cartId: number) => {
    console.log("coupon at Context : ", cartId);
    deleteAppliedCouponMutate({ cartId });
  };

  const saveOrderInfo = (
    cartId: number,
    addressId: number,
    DelevaryMethodId: number
  ) => {
    console.log("coupon at Context : ", cartId);
    saveOrderDataMutate({ cartId, addressId, DelevaryMethodId });
  };

  const updateCart = () => {
    refetch();
  };

  // ****************************** end actions section

  const mergeCartItems = (items: CartItem[]): CartItem[] => {
    const merged: CartItem[] = [];

    items.forEach((item) => {
      const existing = merged.find((i) => i.product_id === item.product_id);
      if (existing) {
        existing.qty += item.qty;
        existing.line_total += item.line_total;
        existing.line_total_with_discount += item.line_total_with_discount;
        existing.line_total_incl_tax += item.line_total_incl_tax;
        existing.line_total_with_discount_incl_tax +=
          item.line_total_with_discount_incl_tax;
      } else {
        merged.push({ ...item });
      }
    });

    // 🔽 Sort by product_name alphabetically (case-insensitive)
    merged.sort((a, b) =>
      a.product_name.localeCompare(b.product_name, undefined, {
        sensitivity: "base",
      })
    );

    return merged;
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        cartItems,
        summaryCart,
        addToCart,
        updateCartItemQuantity,
        deleteCartItem,
        applyCoupon,
        deleteAppliedCoupon,
        saveOrderInfo,
        updateCart,
        isLoadingCart,
        isLoadingAddToCart,
        isLoadingUpdateCartQuantity,
        isLoadingDeleteCartItem,
        isLoadingApplyCoupon,
        isLoadingdeleteAppliedCoupon,
        isLoadingSaveOrderData,
        cartError,
        getCartError,
        margeItems,
        isErrorSaveOrderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
