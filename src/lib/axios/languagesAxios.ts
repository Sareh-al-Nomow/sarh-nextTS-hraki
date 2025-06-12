import axios, { AxiosError } from "axios";
import { LanguageResponse } from "../models/languagesModal";

export const getLanguages = async (): Promise<LanguageResponse> => {
  try {
    const response = await axios.get<LanguageResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/languages`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
