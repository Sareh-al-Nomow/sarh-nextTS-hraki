export type Settings = {
  // ✅ تحكم في تشغيل/إيقاف بعض ميزات المتجر
  enable_reviews: boolean; // هل المراجعات مفعّلة؟
  enable_wishlist: boolean; // هل قائمة الرغبات مفعّلة؟

  // ✅ معلومات الـ SEO (لرؤوس الصفحات مثلاً)
  meta_title: string; // عنوان  الـ meta للصفحات
  meta_description: string; // وصف الـ meta
  meta_keywords: string; // كلمات دلالية للـ meta

  // ✅ روابط التواصل الاجتماعي
  social_media_links: {
    facebook: string;
    twitter: string;
    instagram: string;
    pinterest: string;
  };

  // ✅ طرق الدفع المقبولة
  payment_methods: string[]; // مثال: ['credit_card', 'paypal']

  // ✅ العملات المتاحة
  available_currencies: string[]; // مثال: ['USD', 'JOD']

  // ✅ معلومات عامة عن المتجر
  store_logo: string; // رابط شعار المتجر
  store_name: string; // اسم المتجر
  contact_email: string; // بريد التواصل
  contact_phone: string; // رقم الهاتف
  store_address: string; // العنوان الكامل
  store_country: string; // الدولة
  store_city: string; // المدينة
  post_code: string; // الرمز البريدي

  // ✅ الإعدادات الافتراضية
  default_language: string; // اللغة الافتراضية (مثلاً: "ar" أو "en")
  default_currency: string; // العملة الافتراضية (مثلاً: "USD")

  // 👇 أي خصائص إضافية مستقبلًا
  [key: string]: unknown;
};
