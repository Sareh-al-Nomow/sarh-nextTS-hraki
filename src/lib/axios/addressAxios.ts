import axios, { AxiosError } from "axios";

export interface City {
  id: number;
  name: string;
  city_code: string;
  country_id: number;
  is_active: boolean;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: number;
  name: string;
  country_code: string;
  currency_id: number;
  is_active: boolean;
  flag_url: string | null;
  latitude: string;
  longitude: string;
  uuid: string;
  created_at: string;
  updated_at: string;
  shipping_zone_id: number;
}

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
  city: City;
  country_id: number;
  countries: Country;
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

export interface UpdateAddressRequest {
  full_name?: string;
  phone_number?: string;
  address_1?: string;
  address_2?: string;
  postcode?: string;
}

export const updateAddress = async (
  newAddress: UpdateAddressRequest,
  addressId: number
): Promise<AddressResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put<AddressResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${addressId}`,
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

export const deleteAddress = async (addressId: number): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete<string>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/addresses/${addressId}`,
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
