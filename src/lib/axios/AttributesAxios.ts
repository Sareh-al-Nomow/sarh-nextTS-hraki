import axios, { AxiosError } from "axios";
import { AttributeGroupResponse } from "../models/attributesModal";

export const getAttributeGroupById = async (
  groupId: number | string
): Promise<AttributeGroupResponse> => {
  try {
    const token = localStorage.getItem("token");
    const lang = localStorage.getItem("lang") ?? "en";

    const response = await axios.get<AttributeGroupResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attribute-groups/${groupId}?lang=${lang}`,
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
