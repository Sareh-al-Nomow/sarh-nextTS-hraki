import axios, { AxiosError } from "axios";
import User from "../models/userModel";

export interface UpdateUserRequest {
  full_name?: string;
  phone_number?: string;
  birthday?: string;
}

export const updateProfile = async (
  userData: UpdateUserRequest,
  userId: number
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put<User>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile/${userId}`,
      {
        ...userData,
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
