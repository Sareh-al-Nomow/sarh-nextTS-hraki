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
export interface FrontendProduct {
  categoryId: number;
  createdAt: string | number | Date;
  id: number;
  uuid: string;
  name: string;
  url_key: string;
  price: number;
  originalPrice?: string;
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
  attributes?: {
    attribute_name: string;
    option_text: string;
  }[];
  // reviews: string[];
  meanRating: number | null;
  stock_availability: boolean;
}
