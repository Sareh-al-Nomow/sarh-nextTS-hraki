import axios, { AxiosError } from "axios";
import { Collection } from "../models/collectionModal";

export interface CollectionResponse {
  collections: Collection[];
}

export const getCollections = async (): Promise<CollectionResponse> => {
  try {
    const token = localStorage.getItem("token");
    const lang = localStorage.getItem("lang") ?? "en";

    const response = await axios.get<CollectionResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/collections?lang=${lang}`,
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
