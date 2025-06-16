import { Product } from "@/lib/models/productsModal";
import { FrontEndProductCartItem } from "@/models/frontEndProductCartItem";

export function transformProductCartItem(
  product: Product
): FrontEndProductCartItem {
  return {
    id: product.product_id,
    name: product.description?.name || "Unnamed Product",
    image:
      product.images?.find((img) => img.is_main)?.origin_image ||
      product.images?.[0]?.origin_image ||
      "/placeholder-product.jpg",
    url_key: product.description?.url_key || "",
    price: product.price ?? 0,
    originalPrice: product.old_price ? product.old_price.toFixed(2) : undefined,
    rating: product.meanRating || 0,
    isNew:
      new Date(product.created_at) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    tags: [
      !product.inventory?.stock_availability ? "OUT OF STOCK" : undefined,
      product.old_price ? "SALE" : undefined,
      new Date(product.created_at) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ? "NEW"
        : undefined,
    ].filter(Boolean) as string[],
    short_description: product.description.short_description,
    features: product.attributes
      ?.filter((attr) => attr.attribute?.attribute_code === "feature")
      .map((attr) => attr.option_text),
    colors: product.attributes
      ?.filter((attr) => attr.attribute?.attribute_code === "color")
      .map((attr) => attr.option_text),
    stock_availability: product.inventory.stock_availability,
    description: product.description.description,
  };
}
