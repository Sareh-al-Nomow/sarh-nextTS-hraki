import { Category } from "@/lib/models/categoryModal";

type CategoryWithChildren = Category & { children: Category[] };

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

  return { parentsWithChildren, parentsWithoutChildren };
};
