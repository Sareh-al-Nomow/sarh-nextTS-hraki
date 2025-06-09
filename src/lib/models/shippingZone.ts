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

export interface ShippingMethod {
  shipping_method_id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingZoneMethod {
  shipping_zone_method_id: number;
  method_id: number;
  zone_id: number;
  is_enabled: boolean;
  cost: number;
  calculate_api: string | null;
  condition_type: string | null;
  max: number | null;
  min: number | null;
  price_based_cost: unknown; // adjust if structure known
  weight_based_cost: unknown; // adjust if structure known
  created_at: string;
  updated_at: string;
  method: ShippingMethod;
}

export interface ShippingZone {
  shipping_zone_id: number;
  uuid: string;
  name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  zone_methods: ShippingZoneMethod[];
}

export interface CountryShipping {
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
  ShippingZone: ShippingZone[];
}

