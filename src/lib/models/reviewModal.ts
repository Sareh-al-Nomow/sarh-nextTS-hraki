export interface ProductReview {
  review_id: number;
  uuid: string;
  product_id: number;
  customer_id: number;
  rating: number;
  title: string | null;
  review_text: string;
  status: "pending" | "approved" | "rejected"; // يمكنك تخصيص هذه القيم بناءً على حالتك
  is_verified_purchase: boolean;
  helpful_votes: number;
  not_helpful_votes: number;
  admin_response: string | null;
  created_at: string; // أو Date إذا كنت تقوم بتحويلها باستخدام new Date()
  updated_at: string; // نفس الملاحظة أعلاه
}
