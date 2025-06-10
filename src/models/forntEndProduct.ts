export interface FrontendProduct {
  categoryId: number;
  createdAt: string | number | Date;
  id: number;
  uuid: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  description?: string;
  shortDescription?: string;
  features?: string[];
  inventory?: {
    stock_availability: boolean;
    qty: number;
  };
  images?: {
    single_image: string;
    thumb_image: string;
  }[];
  attributes?: {
    attribute_name: string;
    option_text: string;
  }[];
}
