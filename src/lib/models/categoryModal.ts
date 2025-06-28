export interface CategoryResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Category[];
}

export interface Category {
  id: number;
  uuid: string;
  status: boolean;
  parent_id: number | null;
  include_in_nav: boolean;
  position: number;
  show_products: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  description: CategoryDescription;
  products: Product[];
  subCategory: Category[];
  categoryParent: Category;
}

export interface CategoryDescription {
  category_description_id: number;
  category_description_category_id: number;
  name: string;
  short_description: string;
  description: string;
  image: string; // URL
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  url_key: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
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
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  category_id: number;
  brand_id: number;
}
