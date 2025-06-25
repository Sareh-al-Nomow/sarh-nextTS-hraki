import axios, { AxiosError } from "axios";
import { VariantGroupResponse } from "../models/variantModal";

export const getVariantGroupById = async (
  variantId: number | string
): Promise<VariantGroupResponse> => {
  try {
    const lang = localStorage.getItem("lang") ?? "en";

    const response = await axios.get<VariantGroupResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/variant-groups/${variantId}?lang=${lang}`
    );

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
