"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiCreditCard,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiStar,
  FiZap,
  FiMessageSquare,
  FiRefreshCw,
} from "react-icons/fi";
import { useSettings } from "@/store/SettingsContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../UI/SpinnerLoading";
import { getCategories } from "@/lib/axios/categoryAxios";
import { MdLocalShipping } from "react-icons/md";

export default function Footer() {
  const t = useTranslations("footer");
  const settings = useSettings();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <div className="my-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20">
        <h1>{error.name}</h1>
        <h3>{error.message}</h3>
      </div>
    );
  }

  const displayCategories = categories?.data.slice(0, 5);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Email Subscription Section */}
      <div className="bg-gray-800 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">
                {t("newsletter.title")}
              </h3>
              <p className="text-gray-300 max-w-md">
                {t("newsletter.description")}
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex flex-col sm:flex-row  gap-3 max-w-xl w-full">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-grow px-5 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t("newsletter.button")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("contact.title")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-blue-500" />
                <span className="text-gray-400">{settings.store_address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-blue-500" />
                <Link
                  href={`tel:${settings.contact_phone}`}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {settings.contact_phone}
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-blue-500" />
                <Link
                  href={`mailto:${settings.contact_email}`}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {settings.contact_email}
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="mt-1 text-blue-500" />
                <span className="text-gray-400">{t("contact.hours")}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t("links.title")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/infoPages/about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/infoPages/contact"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t("links.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/infoPages/faq"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t("links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("categories.title")}
            </h3>
            <ul className="space-y-3">
              {displayCategories?.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shopGrid?categoryid=${cat.id}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {cat.description.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{settings.store_name}</h2>
            <p className="text-gray-400 mb-6">{t("about.description")}</p>

            <div className="mb-8">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">
                {t("social.follow")}
              </h4>
              <div className="flex space-x-3">
                <Link
                  href={settings.social_media_links.facebook || "#"}
                  className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FiFacebook className="text-xl" />
                </Link>
                <Link
                  href={settings.social_media_links.twitter || "#"}
                  className="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FiTwitter className="text-xl" />
                </Link>
                <Link
                  href={settings.social_media_links.instagram || "#"}
                  className="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FiInstagram className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {/* Express Delivery */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl flex flex-col items-center text-center border border-gray-700 hover:border-green-400 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-green-500/10 p-3 rounded-full mb-3">
              <FiZap className="text-green-400 text-2xl" />
            </div>
            <h4 className="font-semibold mb-1 text-white">
              {t("badges.delivery.title")}
            </h4>
            <p className="text-sm text-green-200">
              {t("badges.delivery.subtitle")}
            </p>
          </div>

          {/* Instant Support */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl flex flex-col items-center text-center border border-gray-700 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-purple-500/10 p-3 rounded-full mb-3">
              <FiMessageSquare className="text-purple-400 text-2xl" />
            </div>
            <h4 className="font-semibold mb-1 text-white">
              {t("badges.support.title")}
            </h4>
            <p className="text-sm text-purple-200">
              {t("badges.support.subtitle")}
            </p>
          </div>

          {/* Easy Returns */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl flex flex-col items-center text-center border border-gray-700 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-amber-500/10 p-3 rounded-full mb-3">
              <FiRefreshCw className="text-amber-400 text-2xl" />
            </div>
            <h4 className="font-semibold mb-1 text-white">
              {t("badges.returns.title")}
            </h4>
            <p className="text-sm text-amber-200">
              {t("badges.returns.subtitle")}
            </p>
          </div>

          {/* Premium Members */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl flex flex-col items-center text-center border border-gray-700 hover:border-red-400 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-red-500/10 p-3 rounded-full mb-3">
              <FiStar className="text-red-400 text-2xl" />
            </div>
            <h4 className="font-semibold mb-1 text-white">
              {t("badges.premium.title")}
            </h4>
            <p className="text-sm text-red-200">
              {t("badges.premium.subtitle")}
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h4 className="text-center text-gray-300 text-sm font-medium mb-4">
            {t("payment.title")}
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2">
              <FiCreditCard />
              <span className="text-sm">{t("payment.methods.visa")}</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2">
              <FiCreditCard />
              <span className="text-sm">{t("payment.methods.mastercard")}</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center gap-2">
              <MdLocalShipping />
              <span className="text-sm">{t("payment.methods.cod")}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t("copyright", {
                year: new Date().getFullYear(),
                name: settings.store_name,
              })}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/infoPages/privacyPolicy">
                <span className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                  {t("links.privacy")}
                </span>
              </Link>
              <Link href="/infoPages/termsOfService">
                <span className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                  {t("links.terms")}
                </span>
              </Link>
              <Link href="/infoPages/shippingPolicy">
                <span className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                  {t("links.shipping")}
                </span>
              </Link>
              <Link href="/infoPages/returnPolicy">
                <span className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                  {t("links.refund")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
