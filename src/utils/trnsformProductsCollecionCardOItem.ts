import { ProductCollection } from "@/lib/models/collectionModal";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";

export function transformProductToCollectionCartItem(
  productCollection: ProductCollection
): FrontEndProductCartItem {
  const product = productCollection.product;

  return {
    id: productCollection.product_id,
    name: product.description.name,
    image: product.images?.[0]?.origin_image || "",
    url_key: product.description.url_key, // Basic slug from SKU
    price: product.price,
    originalPrice: product.old_price ?? undefined,
    rating: Math.floor(Math.random() * 6), // Random rating 0-5, you may replace this with real data
    isNew: product.inventory.stock_availability,
    tags: [], // Add tags logic if needed
    description: product.description.short_description,
    features: [], // Add features logic if needed
    colors: [], // Add color logic if available
  };
}
