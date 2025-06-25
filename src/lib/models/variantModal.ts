export interface VariantGroupResponse {
  variant_group_id: number;
  uuid: string;
  attribute_group_id: number;
  attribute_one: number;
  attribute_two: number;
  attribute_three: number | null;
  attribute_four: number | null;
  attribute_five: number | null;
  visibility: boolean;
  created_at: string;
  updated_at: string;
  attribute_group: AttributeGroup;
  products: Product[];
}

export interface AttributeGroup {
  attribute_group_id: number;
  uuid: string;
  group_name: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  product_id: number;
  uuid: string;
  type: "simple" | "variant";
  variant_group_id: number;
  visibility: boolean;
  group_id: number;
  sku: string;
  price: number;
  old_price: number;
  is_digital: boolean;
  weight: number;
  tax_class: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  category_id: number;
  brand_id: number;
  description: ProductDescription;
  attributes: ProductAttribute[];
  images: ProductImage[];
  inventory: Inventory;
}

export interface ProductDescription {
  name: string;
  url_key: string;
}

export interface ProductAttribute {
  product_attribute_value_index_id: number;
  product_id: number;
  attribute_id: number;
  option_id: number;
  option_text: string;
  attribute_text: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  origin_image: string;
}

export interface Inventory {
  qty: number;
}
