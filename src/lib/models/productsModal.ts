export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Product {
  product_id: number;
  uuid: string;
  type: "simple" | "configurable";
  variant_group_id: number;
  visibility: boolean;
  group_id: number;
  sku: string;
  price: number;
  old_price: number | null;
  weight: number;
  tax_class: number;
  status: boolean;
  created_at: string;
  updated_at: string;
  category_id: number;
  brand_id: number;
  description: ProductDescription;
  images: ProductImage[];
  inventory: ProductInventory;
  category: Category;
  brand: Brand;
  attributes: ProductAttribute[];
  reviews: Review[];
  meanRating: number | null;
}

export interface ProductDescription {
  product_description_id: number;
  product_description_product_id: number;
  name: string;
  description: string;
  short_description: string;
  url_key: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
  updated_at: string;
}

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

interface ProductInventory {
  product_inventory_id: number;
  product_inventory_product_id: number;
  qty: number;
  manage_stock: boolean;
  stock_availability: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  uuid: string;
  status: boolean;
  parent_id: number | null;
  include_in_nav: boolean;
  position: number;
  show_products: boolean;
  created_at: string;
  updated_at: string;
  description: CategoryDescription;
}

interface CategoryDescription {
  category_description_id: number;
  category_description_category_id: number;
  name: string;
  short_description: string;
  description: string;
  image: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  url_key: string;
  created_at: string;
  updated_at: string;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductAttribute {
  product_attribute_value_index_id: number;
  product_id: number;
  attribute_id: number;
  option_id: number;
  option_text: string;
  created_at: string;
  updated_at: string;
  attribute: Attribute;
  option: AttributeOption;
}

interface Attribute {
  attribute_id: number;
  uuid: string;
  attribute_code: string;
  attribute_name: string;
  type: string;
  is_required: boolean;
  display_on_frontend: boolean;
  sort_order: number;
  is_filterable: boolean;
  created_at: string;
  updated_at: string;
}

interface AttributeOption {
  attribute_option_id: number;
  uuid: string;
  attribute_id: number;
  attribute_code: string;
  option_text: string;
  created_at: string;
  updated_at: string;
}

interface Review {
  review_id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}
