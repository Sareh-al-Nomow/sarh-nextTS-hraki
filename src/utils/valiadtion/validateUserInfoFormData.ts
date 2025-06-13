export function validateUpdateUserFormData(data: {
  full_name: string;
  phone_number: string;
  birthday: string;
}): string[] {
  const errors: string[] = [];

  if (!data.full_name || data.full_name.trim().length < 3)
    errors.push("Full name is required and should be at least 3 characters.");

  if (!data.phone_number || !/^\+?[1-9]\d{1,14}$/.test(data.phone_number)) {
    errors.push("A valid phone number is required Like +962791234567.");
  }

  return errors;
}
