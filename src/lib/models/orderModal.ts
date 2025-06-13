export interface Order {
  order_id: number;
  uuid: string;
  integration_order_id: string | null;
  sid: string | null;
  order_number: string;
  status: string;
  cart_id: number;
  currency: string;
  customer_id: number;
  customer_email: string;
  customer_full_name: string;
  user_ip: string | null;
  user_agent: string | null;
  coupon: string | null;
  shipping_fee_excl_tax: number;
  shipping_fee_incl_tax: number;
  discount_amount: number | null;
  sub_total: number;
  sub_total_incl_tax: number;
  sub_total_with_discount: number;
  sub_total_with_discount_incl_tax: number;
  total_qty: number;
  total_weight: number;
  tax_amount: number;
  tax_amount_before_discount: number;
  shipping_tax_amount: number;
  shipping_note: string | null;
  grand_total: number;
  shipping_method: string;
  shipping_method_name: string;
  shipping_address_id: number;
  payment_method: string;
  payment_method_name: string;
  billing_address_id: number;
  shipment_status: string | null;
  payment_status: string;
  created_at: string; // ISO DateTime
  updated_at: string; // ISO DateTime
  total_tax_amount: number;
  items: OrderItem[];
  shipments: Shipment[];
  transactions: Transaction[];
  activities: Activity[];
}

export interface OrderItem {
  order_item_id: number;
  uuid: string;
  order_item_order_id: number;
  product_id: number;
  referer: string | null;
  product_sku: string;
  product_name: string;
  thumbnail: string | null;
  product_weight: number;
  product_price: number;
  product_price_incl_tax: number;
  qty: number;
  final_price: number;
  final_price_incl_tax: number;
  tax_percent: number;
  tax_amount: number;
  tax_amount_before_discount: number;
  discount_amount: number;
  line_total: number;
  line_total_with_discount: number;
  line_total_incl_tax: number;
  line_total_with_discount_incl_tax: number;
  variant_group_id: number | null;
  variant_options: unknown;
  product_custom_options: unknown;
  requested_data: unknown;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface ProductImage {
  product_image_id: number;
  product_image_product_id: number;
  origin_image: string;
  thumb_image: string;
  listing_image: string;
  single_image: string;
  is_main: boolean;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}

export interface Product {
  product_id: number;
  uuid: string;
  sku: string;
  type: string; // e.g., "simple"
  group_id: number;
  category_id: number;
  brand_id: number;
  variant_group_id: number;
  price: number;
  old_price: number | null;
  weight: number;
  tax_class: number;
  status: boolean;
  visibility: boolean;
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
  images: ProductImage[];
}

export interface Shipment {
  shipment_id: number;
  uuid: string;
  shipment_order_id: number;
  carrier: string;
  tracking_number: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  payment_transaction_id: number;
  uuid: string;
  payment_transaction_order_id: number;
  transaction_id: string;
  transaction_type: string;
  amount: number;
  parent_transaction_id: string | null;
  payment_action: string;
  additional_information: Record<string, unknown>; // adjust if needed
  created_at: string;
}

export interface Activity {
  order_activity_id: number;
  uuid: string;
  order_activity_order_id: number;
  comment: string;
  customer_notified: boolean;
  created_at: string;
  updated_at: string;
}
