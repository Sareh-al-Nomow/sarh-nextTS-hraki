export default interface User {
  id: number;
  uuid: string;
  email: string;
  phone_number: string;
  password: string;
  googleId: string | null;
  facebookId: string | null;
  birthday: string | null;
  otp: string;
  provider: string;
  avatar: string | null;
  full_name: string;
  resetToken: string | null;
  resetTokenExpires: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_banned: boolean;
  is_terms_accepted: boolean;
  is_privacy_policy_accepted: boolean;
  is_newsletter_accepted: boolean;
  group_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}
