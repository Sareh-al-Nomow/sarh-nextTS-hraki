import axios, { AxiosError } from "axios";
import { Product } from "../models/productsModal";

interface searchProductsResponse {
  data: Product[];
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  lang?: string;
}

export const getSearchProducts = async (
  params: GetProductsParams = {},
  signal?: AbortSignal
): Promise<searchProductsResponse> => {
  try {
    const lang = localStorage.getItem("lang") ?? "en";
    const response = await axios.get<searchProductsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/search?lang=${lang}`,
      { params, signal }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
