import axios, { AxiosError } from "axios";
import { ProductsResponse } from "../models/productsModal";

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
