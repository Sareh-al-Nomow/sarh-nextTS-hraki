import axios, { AxiosError } from "axios";
import { Order } from "../models/orderModal";

interface OrderPayload {
  cartId: number;
  paymentMethod: "stripe" | "cash_on_delivery";
}

interface SaveOrderPayload {
  cartId: number;
  addressId: number;
  DelevaryMethodId: number;
}

export const saveOrderData = async ({
  cartId,
  addressId,
  DelevaryMethodId,
}: SaveOrderPayload): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("رمز الدخول غير موجود. الرجاء تسجيل الدخول.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Using token:", token);

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${cartId}/shipping-address/${addressId}`,
      {},
      config
    );

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/${cartId}/shipping-method/${DelevaryMethodId}`,
      {},
      config
    );
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "حدث خطأ غير متوقع أثناء حفظ الطلب";
    throw new Error(message);
  }
};

export const placeOrder = async (payload: OrderPayload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("يجب تسجيل الدخول قبل تنفيذ الطلب.");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    // محاولة استخراج الرسالة من استجابة السيرفر
    const message =
      error.response?.data?.message ||
      error.message ||
      "حدث خطأ أثناء تنفيذ الطلب.";

    throw new Error(message);
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Order[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
