export interface FrontEndProductCartItem {
  id: number;
  name: string;
  image: string;              // URL to the image
  url_key: string;            // used for the product detail page
  price: string | number;
  originalPrice?: string | number;
  rating: number;             // from 0 to 5
  isNew?: boolean;
  tags?: string[];            // e.g., ["HOT", "NEW"]
  description?: string;
  features?: string[];
  colors?: string[];          // HEX or CSS color strings
}
