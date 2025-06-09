import axios, { AxiosError } from "axios";

export interface AddressResponse {
  id: number;
  uuid: string;
  user_id: number;
  full_name: string;
  phone_number: string;
  address_1: string;
  address_2: string;
  postcode: string;
  city_id: number;
  country_id: number;
  is_default: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export const getAddresses = async (): Promise<AddressResponse[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<AddressResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses`,
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

export interface AddAddressRequest {
  full_name: string;
  phone_number: string;
  address_1: string;
  address_2: string;
  postcode: string;
  country_id: number;
  city_id: number;
}

export const addAddress = async (
  newAddress: AddAddressRequest
): Promise<AddressResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<AddressResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses`,
      {
        ...newAddress,
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
