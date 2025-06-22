export async function getLocationCurrency(ip: string): Promise<string> {
  // ✅ إذا في تطوير محلي، استخدم عملة ثابتة (مثلاً الأردن)
  if (process.env.NODE_ENV === "development") {
    console.log("🌍 Development mode - using mock IP and currency");
    return "JOD";
  }

  try {
    // ✅ استدعاء خدمة مجانية بدون مفتاح API
    const res = await fetch(`https://freegeoip.app/json/${ip}`);
    if (!res.ok) {
      throw new Error("❌ Failed to fetch IP location");
    }

    const data = await res.json();
    const countryCode = data.country_code;

    console.log(`🌍 IP Location detected: ${countryCode}`);

    return getCurrencyFromCountry(countryCode);
  } catch (error) {
    console.error("⚠️ Error in getLocationCurrency:", error);
    return "USD"; // fallback
  }
}

// ✅ تحويل كود الدولة إلى رمز العملة
function getCurrencyFromCountry(countryCode: string): string {
  const map: Record<string, string> = {
    JO: "JOD",
    US: "USD",
    AE: "AED",
    SA: "SAR",
    EG: "EGP",
    IQ: "IQD",
    GB: "GBP",
    FR: "EUR",
    DE: "EUR",
    // أضف أي دول تحتاجها
  };

  return map[countryCode] || "USD";
}
