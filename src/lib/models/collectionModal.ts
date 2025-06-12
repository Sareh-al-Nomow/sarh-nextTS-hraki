// Product image interface
interface ProductImage {
  origin_image: string;
}

// Product description interface
interface ProductDescription {
  name: string;
  description: string;
  short_description: string;
}

// Inventory interface
interface ProductInventory {
  stock_availability: boolean;
}

// Product interface
interface Product {
  price: number;
  old_price: number | null;
  sku: string;
  category_id: number;
  brand_id: number;
  description: ProductDescription;
  images: ProductImage[];
  translations: unknown[]; // Adjust if translation structure is needed
  inventory: ProductInventory;
}

// Product Collection Relation
export interface ProductCollection {
  product_collection_id: number;
  collection_id: number;
  product_id: number;
  product: Product;
}

// Collection Translation
interface CollectionTranslation {
  name: string;
  description: string;
  lang_code: string;
}

// Collection interface
export interface Collection {
  collection_id: number;
  uuid: string;
  name: string;
  description: string;
  image: string;
  code: string;
  type: string;
  created_at: string;
  updated_at: string;
  translations: CollectionTranslation[];
  products: ProductCollection[];
}
