export interface Address {
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
