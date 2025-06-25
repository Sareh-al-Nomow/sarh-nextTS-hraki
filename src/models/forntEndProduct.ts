interface ProductImage {
  product_image_id: number;
  product_image_product_id: number;
  origin_image: string;
  thumb_image: string;
  listing_image: string;
  single_image: string;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface Attributes {
  attribute_id: number;
  option_text: string;
}
export interface FrontendProduct {
  categoryId: number;
  createdAt: string | number | Date;
  id: number;
  uuid: string;
  name: string;
  url_key: string;
  group_id: number;
  variant_group_id: number;
  price: number;
  originalPrice?: number | undefined;
  image: string;
  rating: number;
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  description?: string;
  short_description?: string;
  features?: string[];
  inventory?: {
    stock_availability: boolean;
    qty: number;
  };
  images?: ProductImage[];
  attributes?: Attributes[];
  // reviews: string[];
  meanRating: number | null;
  stock_availability: boolean;
}
