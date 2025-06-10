import axios, { AxiosError } from "axios";
import {  ProductsResponse } from "../models/productsModal";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sku?: string;
  name?: string;
  categoryId?: number;
  brandId?: number;
  visibility?: boolean;
  status?: "active" | "inactive";
  lang?: string;
}

export const getProducts = async (
  params: GetProductsParams = {},
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
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

export const getProductByUrlKey = async (
  url_key: string,
  signal?: AbortSignal
): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/by-url/${url_key}`,
      { signal }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
