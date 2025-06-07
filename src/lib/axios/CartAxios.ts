import axios, { AxiosError } from "axios";

export interface CartResponse {
  cart_id: number;
  uuid: string;
  sid: string | null;
  currency: string | null;
  customer_id: number;
  customer_group_id: number | null;
  customer_email: string;
  customer_full_name: string;
  user_ip: string | null;
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
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  total_tax_amount: number;
  user_id: number;
  items: CartItem[];
}

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

export const getCartByToken = async (): Promise<CartResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<CartResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/customer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

export const AddToCart = async (
  productId: number,
  qty: number = 1,
  productName?: string
): Promise<{ success: boolean; message: string }> => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  if (!productId) {
    return { success: false, message: "Product ID is required" };
  }

  try {
    // Get or create cart
    let cartRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/customer`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (cartRes.status === 404) {
      cartRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
    }

    const cartData = await cartRes.json();
    const cartId = cartData.cart_id || cartData.id;

    // Get cart items
    const itemsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cartId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const cart = await itemsRes.json();
    const existing = cart.items?.find(
      (item: CartItem) => item.product_id === productId
    );

    // Update or add
    if (existing) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cartId}/items/${existing.cart_item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qty: existing.qty + qty }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return {
        success: true,
        message: `${productName || "Product"} quantity updated.`,
      };
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cartId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qty, product_id: productId }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return {
        success: true,
        message: `${productName || "Product"} added to cart.`,
      };
    }
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) {
      message = err.message;
    }
    return { success: false, message };
  }
};
