import axios, { AxiosError } from "axios";
import { ProductReviewProfile ,ProductReview } from "../models/reviewModal";

export const getReviewsForProduct = async (
  productId: number,
  signal?: AbortSignal
): Promise<ProductReviewProfile[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<ProductReviewProfile[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/product/${productId}/customer`,
      {
        signal,
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

export interface AddReviweRequest {
  product_id: number;
  rating: number;
  review_text: string;
}

export const addReview = async (
  newReview: AddReviweRequest
): Promise<ProductReview> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<ProductReview>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`,
      {
        ...newReview,
      },
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

export const getReviewsForProductById = async (
  productId: number,
  signal?: AbortSignal
): Promise<ProductReview[]> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<ProductReview[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/product/${productId}`,
      {
        signal,
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

