import { VariantGroupResponse } from "@/lib/models/variantModal";

export interface FlattenedAttribute {
  product_id: number;
  attribute_id: number;
  option_id: number;
  option_text: string;
  attribute_text: string;
  url_key: string;
}

export function extractAttributesFromVariantGroup(
  data: VariantGroupResponse | undefined
): FlattenedAttribute[] {
  if (!data || !data.products || !Array.isArray(data.products)) return [];

  const attributes: FlattenedAttribute[] = [];

  for (const product of data.products) {
    const url_key = product.description?.url_key ?? "";
    for (const attr of product.attributes || []) {
      attributes.push({
        product_id: attr.product_id,
        attribute_id: attr.attribute_id,
        option_id: attr.option_id,
        option_text: attr.option_text,
        attribute_text: attr.attribute_text,
        url_key,
      });
    }
  }

  return attributes;
}

export interface FlattenedAttributeOption {
  option_id: number;
  option_text: string;
  url_key: string;
}

export interface FlattenedAttributeGroup {
  attribute_id: number;
  attribute_text: string;
  options: FlattenedAttributeOption[];
}

export function extractCoupledVariants(
  data: VariantGroupResponse | undefined
): {
  url_key: string;
  options: {
    attribute_id: number;
    option_id: number;
    option_text: string;
  }[];
}[] {
  if (!data || !Array.isArray(data.products)) return [];

  return data.products.map((product) => ({
    url_key: product.description?.url_key ?? "",
    options:
      product.attributes?.map((attr) => ({
        attribute_id: attr.attribute_id,
        option_id: attr.option_id,
        option_text: attr.option_text,
      })) ?? [],
  }));
}
