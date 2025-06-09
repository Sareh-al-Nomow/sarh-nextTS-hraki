import { AddAddressRequest } from "@/lib/axios/addressAxios";

export function validateAddressForm(data: AddAddressRequest): string[] {
  const errors: string[] = [];

  if (!data.full_name || data.full_name.trim().length < 3)
    errors.push("Full name is required and should be at least 3 characters.");

  if (!data.phone_number || !/^\+?[1-9]\d{1,14}$/.test(data.phone_number)) {
    errors.push("A valid phone number is required Like +962791234567.");
  }

  if (!data.address_1 || data.address_1.trim().length < 3)
    errors.push("Address 1 is required.");

  if (!data.postcode || !/[0-9]{4,10}$/.test(data.postcode))
    errors.push("Postcode must be a number between 4-10 digits.");

  if (
    !data.city_id ||
    isNaN(Number(data.city_id)) ||
    Number(data.city_id) === 0
  )
    errors.push("City is required.");

  if (
    !data.country_id ||
    isNaN(Number(data.country_id)) ||
    Number(data.country_id) === 0
  )
    errors.push("Country is required.");

  return errors;
}
