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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings?lang=${locale}`,
    {
      // next: { revalidate: 60 * 60 * 24 }, // كاش يومي
    }
  );

  if (!res.ok) return null;

  return res.json();
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

  // ✅ تحقق من صلاحية اللغة
  if (!hasLocale(routing.locales, locale)) {
    redirect("/en");
  }

  // ✅ الترجمة
  const messages = await getMessages();

  // ✅ الإعدادات
  const rawSettings = await getSettings(locale);
  const settings = parseSettings(rawSettings) as Settings;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${dosis.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SettingsProvider settings={settings}>
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
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export { generateMetadata } from "./generateMetadata";
