import axios, { AxiosError } from "axios";
import { CategoryResponse } from "../models/categoryModal";

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const token = localStorage.getItem("token");
    const lang = localStorage.getItem("lang") ?? "en";
    const response = await axios.get<CategoryResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?lang=${lang}`,
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
