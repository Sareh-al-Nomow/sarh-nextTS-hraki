import axios, { AxiosError } from "axios";
import { CategoryResponse } from "../models/categoryModal";

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<CategoryResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`,
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
