// src/lib/utils/organizeBrands.ts

import { BrandWithProducts } from "@/lib/models/brandsModal";

/**
 * Extracts only the id and name from a BrandWithProducts object.
 */
export const organizeBrands = (brand: BrandWithProducts) => {
  return {
    id: brand.id,
    name: brand.name, // or brand.description?.name if that's the correct field
  };
};
