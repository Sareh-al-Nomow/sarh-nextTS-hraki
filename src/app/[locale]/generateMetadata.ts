import { getSettings } from "@/lib/ApiSettings/getSettings";
import { Settings } from "@/models/forntEndSettings";
import { parseSettings } from "@/utils/parseSettings";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const rawSettings = await getSettings(locale);

  if (!rawSettings) {
    return {
      title: "Default Site Title",
      description: "Default description for the site.",
      keywords: ["default", "ecommerce"],
    };
  }

  const settings = parseSettings(rawSettings) as Settings;

  return {
    title: settings.meta_title,
    description: settings.meta_description,
    keywords: settings.meta_keywords
      ? settings.meta_keywords.split(",").map((k) => k.trim())
      : undefined,
    icons: {
      icon: settings.store_logo,
    },

    openGraph: {
      title: settings.meta_title,
      description: settings.meta_description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: settings.store_name,
      images: [
        {
          url: settings.store_logo,
          width: 800,
          height: 600,
          alt: settings.store_name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.meta_title,
      description: settings.meta_description,
      images: [settings.store_logo],
    },
    // alternates: {
    //   canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    //   languages: {
    //     en: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
    //     ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar`,
    //   },
    // },
  };
}
