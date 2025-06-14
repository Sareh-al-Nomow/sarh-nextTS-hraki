import axios, { AxiosError } from "axios";
import { BrandsResponse} from "../models/brandsModal";

export const getBrands = async (): Promise<BrandsResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<BrandsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/brands`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
