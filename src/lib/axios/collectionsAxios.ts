import axios, { AxiosError } from "axios";
import { Collection } from "../models/collectionModal";

interface CollectionResponse {
  collections: Collection[];
}

export const getCollections = async (): Promise<CollectionResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<CollectionResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/collections`,
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
