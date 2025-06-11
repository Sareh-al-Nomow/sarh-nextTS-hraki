import axios, { AxiosError } from "axios";

interface OrderPayload {
  cartId: number;
  paymentMethod: "stripe" | "cash_on_delivery";
}

export const placeOrder = async (payload: OrderPayload) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("يجب تسجيل الدخول قبل تنفيذ الطلب.");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
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
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "حدث خطأ غير متوقع أثناء دفع";
    throw new Error(message);
  }
};
