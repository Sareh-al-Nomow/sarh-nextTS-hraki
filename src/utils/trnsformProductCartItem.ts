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
    originalPrice: product.old_price ?? undefined,
    rating: product.meanRating || 0,
    tags: [
      !product.inventory?.stock_availability ? "OUT OF STOCK" : undefined,
      product.old_price ? "SALE" : undefined,
    ].filter(Boolean) as string[],
    short_description: product.description.short_description,
    features: product.attributes
      ?.filter((attr) => attr.attribute?.attribute_code === "feature")
      .map((attr) => attr.option_text),
    colors: product.attributes
      ?.filter((attr) => attr.attribute?.attribute_code === "color")
      .map((attr) => attr.option_text),
    stock_availability: product.inventory.qty === 0 ? false : true,
    description: product.description.description,
  };
}
