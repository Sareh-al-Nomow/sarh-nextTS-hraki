import { Country } from "@/models/forntEndCountry";
import axios, { AxiosError } from "axios";
import { CountryShipping } from "../models/shippingZone";

export const getCountries = async (): Promise<Country[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Country[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/countries`,
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

export const getCountry = async (
  countryId: number
): Promise<CountryShipping> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<CountryShipping>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/countries/${countryId}`,
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
