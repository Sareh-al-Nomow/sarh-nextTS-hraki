import axios, { AxiosError } from "axios";
import User from "../models/userModel";

export interface otpRequest {
  email: string;
  otp: string;
}

export interface otpResponse {
  user: User;
  token: string;
}

export const otpVerify = async (data: otpRequest): Promise<otpResponse> => {
  console.log(data);

  try {
    const response = await axios.post<otpResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-otp`,
      data
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "حدث خطأ غير متوقع أثناء التسجيل";
    throw new Error(message);
  }
};
