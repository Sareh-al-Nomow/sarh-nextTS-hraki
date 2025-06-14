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
}

export interface BrandWithProducts {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface BrandsResponse {
  data: BrandWithProducts[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
