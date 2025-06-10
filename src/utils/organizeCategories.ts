import { Category } from "@/lib/models/categoryModal";

type CategoryWithChildren = Category & { children: Category[] };
type CategoryWithSubCategory = Category & { subCategory?: Category[] };

export const organizeParentCategoriesWithSubs = (categories: Category[]) => {
  // Create a map to group children by parent_id
  const childrenMap: Record<string, Category[]> = {};

  // First pass: build the children map
  categories.forEach((cat) => {
    if (cat.parent_id) {
      if (!childrenMap[cat.parent_id]) {
        childrenMap[cat.parent_id] = [];
      }
      childrenMap[cat.parent_id].push(cat);
    }
  });

  // Filter only parent categories (parent_id === null)
  const parentCategories = categories.filter((cat) => cat.parent_id === null);

  // Add subCategory property to parents that have children
  const parentsWithSubs: CategoryWithSubCategory[] = parentCategories.map(
    (parent) => {
      if (childrenMap[parent.id]) {
        return {
          ...parent,
          subCategory: childrenMap[parent.id],
        };
      }
      return parent;
    }
  );

  return parentsWithSubs;
};

export const organizeCategories = (categories: Category[]) => {
  // تصفية الفئات التي ليس لها اباء (parent_id === null)
  const parents = categories.filter((cat) => cat.parent_id === null);

  // تصفية الفئات الفرعية (subcategories)
  const subcategories = categories.filter((cat) => cat.parent_id !== null);

  // إنشاء خريطة لتجميع الأبناء حسب parent_id
  const map: Record<string, Category[]> = {};
  subcategories.forEach((sub) => {
    if (!sub.parent_id) return; // تأكد من وجود parent_id
    if (!map[sub.parent_id]) map[sub.parent_id] = [];
    map[sub.parent_id].push(sub);
  });

  // بناء مصفوفة الـ parent categories التي لها أبناء فقط
  const parentsWithChildren: CategoryWithChildren[] = parents
    .map((parent) => {
      const children = map[parent.id] || [];
      if (children.length === 0) return null; // إذا لا يوجد أبناء تجاهل
      return { ...parent, children };
    })
    .filter(Boolean) as CategoryWithChildren[];

  // بناء مصفوفة للـ parents الذين ليس لديهم أبناء (يعني ما موجودين في الـ parentsWithChildren)
  const parentsWithoutChildren = parents.filter(
    (parent) => !(parent.id in map)
  );

  const allParent = organizeParentCategoriesWithSubs(categories);

  // بناء allWithSub: كل الفئات مع خاصية subCategory إذا كانت موجودة
  const allWithSub: CategoryWithSubCategory[] = categories.map((cat) => {
    const subCategory = map[cat.id];
    if (subCategory && subCategory.length > 0) {
      return { ...cat, subCategory };
    }
    return cat;
  });

  return { parentsWithChildren, parentsWithoutChildren, allWithSub, allParent };
};
