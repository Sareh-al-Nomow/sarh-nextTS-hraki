import { Category } from "@/lib/models/categoryModal";

// Type for subcategory that includes its parent
type SubCategoryWithParent = Category & {
  parentCategory: CategoryWithParent | undefined;
};

// Category with full parent category instead of parent_id
type CategoryWithParent = Category & {
  categoryParent?: CategoryWithParent;
};

// Category that may have subcategories
type CategoryWithSubCategory = CategoryWithParent & {
  subCategory: SubCategoryWithParent[];
};

// Optional: for other uses
type CategoryWithChildren = Category & {
  children: Category[];
};

export const organizeParentCategoriesWithSubs = (
  categories: Category[]
): CategoryWithSubCategory[] => {
  const childrenMap: Record<string, Category[]> = {};

  categories.forEach((cat) => {
    if (cat.parent_id) {
      if (!childrenMap[cat.parent_id]) {
        childrenMap[cat.parent_id] = [];
      }
      childrenMap[cat.parent_id].push(cat);
    }
  });

  const parentCategories = categories.filter((cat) => cat.parent_id === null);

  const parentsWithSubs: CategoryWithSubCategory[] = parentCategories.map(
    (parent) => {
      const sub = childrenMap[parent.id];
      const subWithParent: SubCategoryWithParent[] = (sub ?? []).map((child) => ({
        ...child,
        parentCategory: { ...parent },
      }));
      return {
        ...parent,
        subCategory: subWithParent,
      };
    }
  );

  return parentsWithSubs;
};

export const organizeCategories = (categories: Category[]) => {
  // Build map for quick access and to replace parent_id with full object recursively
  const categoryMap: Record<number, Category> = {};
  categories.forEach((cat) => {
    categoryMap[cat.id] = cat;
  });

  // Helper to remove parent_id and add categoryParent recursively
  function transformCategory(cat: Category): CategoryWithParent {
    const { parent_id, ...rest } = cat;
    const categoryParent = parent_id !== null ? transformCategory(categoryMap[parent_id]) : undefined;
    return categoryParent
      ? {
          ...rest,
          parent_id,
          categoryParent,
        }
      : {
          ...rest,
          parent_id,
        };
  }

  // Build children map
  const childrenMap: Record<number, Category[]> = {};
  categories.forEach((cat) => {
    if (cat.parent_id !== null) {
      if (!childrenMap[cat.parent_id]) childrenMap[cat.parent_id] = [];
      childrenMap[cat.parent_id].push(cat);
    }
  });

  // parents with children
  const parents = categories.filter((cat) => cat.parent_id === null);
  const parentsWithChildren: CategoryWithChildren[] = parents
    .map((parent) => {
      const children = childrenMap[parent.id] || [];
      if (children.length === 0) return null;
      return { ...parent, children };
    })
    .filter(Boolean) as CategoryWithChildren[];

  const parentsWithoutChildren = parents.filter(
    (parent) => !childrenMap[parent.id] || childrenMap[parent.id].length === 0
  );

  const allParent = organizeParentCategoriesWithSubs(categories);

  // Build allWithSub with full categoryParent and parentCategory inside subCategory
  const allWithSub: CategoryWithSubCategory[] = categories.map((cat) => {
    const transformedCat = transformCategory(cat);
    const sub = childrenMap[cat.id] ?? [];
    const subWithParent: SubCategoryWithParent[] = sub.map((child) => ({
      ...transformCategory(child),
      parentCategory: transformedCat,
    }));

    return {
      ...transformedCat,
      subCategory: subWithParent,
    };
  });

  return {
    parentsWithChildren,
    parentsWithoutChildren,
    allWithSub,
    allParent,
  };
};

// Helper to remove parent_id from category object
// (No longer needed, but kept for reference.)
// function omitParentId(cat: Category): Omit<Category, "parent_id"> {
//   const { parent_id, ...rest } = cat;
//   return rest;
// }
