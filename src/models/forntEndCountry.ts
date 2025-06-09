export interface Currency {
  id: number;
  uuid: string;
  name: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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
  uuid: string;
  name: string;
  country_code: string;
  currency_id: number;
  flag_url: string | null;
  is_active: boolean;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  currency: Currency;
  Cities: City[];
}
