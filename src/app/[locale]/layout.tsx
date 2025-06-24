// app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Dosis } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/store/AuthContext";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/footer/footer";
import CartContextProvider from "@/store/CartContext";
import { AuthModalProvider } from "@/store/AuthModalContext";
import { SearchProvider } from "@/store/SearchContext";
import ClientLayoutPart from "./ClientLayoutPart";

import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { redirect } from "next/navigation";
import TopHeader from "@/components/Navigation/TopHeader";
import { SettingsProvider } from "@/store/SettingsContext";
import { parseSettings } from "@/utils/parseSettings";
import { Settings } from "@/models/forntEndSettings";

import { headers } from "next/headers";
import { convertCurrency } from "@/lib/currencySettings/convert-currency";
import { getLocationCurrency } from "@/lib/currencySettings/get-location";
import CurrencyProvider from "@/store/CurrencyContext";

// ✅ الخط: Dosis
const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

// ✅ جلب إعدادات الموقع من السيرفر حسب اللغة
async function getSettings(locale: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings?lang=${locale}`
  );
  if (!res.ok) return null;
  return res.json();
}

// ✅ دالة للتحقق من صلاحية رمز العملة (3 أحرف إنجليزية كبيرة)
function isValidCurrency(value: unknown): value is string {
  return typeof value === "string" && /^[A-Z]{3}$/.test(value);
}

// ✅ Root Layout داخل مجلد [locale]
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // التحقق من صلاحية اللغة
  if (!hasLocale(routing.locales, locale)) {
    redirect("/en");
  }

  // جلب رسائل الترجمة
  const messages = await getMessages();

  // جلب إعدادات الموقع من السيرفر
  const rawSettings = await getSettings(locale);
  const settings = parseSettings(rawSettings) as Settings;

  // العملة الافتراضية من الإعدادات أو الدولار
  const defaultCurrency = settings?.default_currency ?? "USD";

  // جلب IP الزائر
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "8.8.8.8";

  // جلب عملة المستخدم حسب IP
  const userCurrencyRaw = await getLocationCurrency(ip);

  // تحقق من صلاحية الرموز
  const baseSystemCurrency = isValidCurrency(defaultCurrency)
    ? defaultCurrency
    : "USD";

  const userIpCurrency = isValidCurrency(userCurrencyRaw)
    ? userCurrencyRaw
    : baseSystemCurrency;

  console.log("🌍 Visitor IP:", ip);
  console.log("💰 Default currency:", baseSystemCurrency);
  console.log("💱 User currency:", userIpCurrency);

  // حساب نسبة التحويل
  const rate = await convertCurrency(1, baseSystemCurrency, userIpCurrency);

  console.log(
    `💱 Conversion rate from ${baseSystemCurrency} to ${userIpCurrency} is:`,
    rate
  );

  console.log(settings.available_currencies);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${dosis.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider settings={settings}>
            <CurrencyProvider
              defaultSettingCurrrency={baseSystemCurrency}
              userIpCurrency={userIpCurrency}
            >
              <QueryClientProvider client={queryClient}>
                <AuthModalProvider>
                  <SearchProvider>
                    <AuthProvider>
                      <CartContextProvider>
                        <Toaster />
                        <div id="root-modal"></div>
                        <ClientLayoutPart />
                        <TopHeader />
                        <Navbar />
                        {children}
                        <Footer />
                      </CartContextProvider>
                    </AuthProvider>
                  </SearchProvider>
                </AuthModalProvider>
              </QueryClientProvider>
            </CurrencyProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export { generateMetadata } from "./generateMetadata";
