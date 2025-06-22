"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiCreditCard,
  FiTruck,
  FiShield,
  FiPrinter,
} from "react-icons/fi";
import { useSettings } from "@/store/SettingsContext";

export default function Footer() {
  const settings = useSettings();
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-start">
              SARAH
            </h2>
            <p className="text-gray-400 mb-6  text-center sm:text-start">
              {t("description")}
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <Link href={settings.social_media_links.facebook}>
                <FiFacebook className="text-xl text-gray-400 hover:text-blue-500 transition-colors" />
              </Link>
              <Link href={settings.social_media_links.twitter}>
                <FiTwitter className="text-xl text-gray-400 hover:text-blue-500 transition-colors" />
              </Link>
              <Link href={settings.social_media_links.instagram}>
                <FiInstagram className="text-xl text-gray-400 hover:text-blue-500 transition-colors" />
              </Link>
              <Link href={settings.social_media_links.pinterest}>
                <FiPrinter className="text-xl text-gray-400 hover:text-blue-500 transition-colors" />
              </Link>
            </div>
          </motion.div>

          {/* Shop Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-start">
              {t("sections.shop.title")}
            </h3>
            <ul className="space-y-2 text-center sm:text-start">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.shop.items")[0]}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.shop.items")[1]}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.shop.items")[2]}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Service Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-start">
              {t("sections.service.title")}
            </h3>
            <ul className="space-y-2 text-center sm:text-start">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.service.items")[0]}
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.service.items")[2]}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-center sm:text-start">
              {t("sections.about.title")}
            </h3>
            <ul className="space-y-2 text-center sm:text-start">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.about.items")[0]}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.about.items")[1]}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {t.raw("sections.about.items")[2]}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <Link href="/shipping">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg cursor-pointer"
            >
              <div className="text-blue-500">
                <FiTruck className="text-2xl" />
              </div>
              <span className="text-sm font-medium">
                {t("badges.shipping")}
              </span>
            </motion.div>
          </Link>
          <Link href="/warranty">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg cursor-pointer"
            >
              <div className="text-blue-500">
                <FiShield className="text-2xl" />
              </div>
              <span className="text-sm font-medium">
                {t("badges.warranty")}
              </span>
            </motion.div>
          </Link>
          <Link href="/secure">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg cursor-pointer"
            >
              <div className="text-blue-500">
                <FiCreditCard className="text-2xl" />
              </div>
              <span className="text-sm font-medium">{t("badges.secure")}</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Payment Methods - Static */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800 p-3 rounded-md flex items-center gap-2"
          >
            <FiCreditCard />
            <span className="text-sm">{t.raw("paymentMethods")[0]}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800 p-3 rounded-md flex items-center gap-2"
          >
            <FiCreditCard />
            <span className="text-sm">{t.raw("paymentMethods")[1]}</span>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{t("bottom.copyright")}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#">
                <motion.span whileHover={{ color: "#3B82F6" }}>
                  {t("bottom.privacy")}
                </motion.span>
              </Link>
              <Link href="#">
                <motion.span whileHover={{ color: "#3B82F6" }}>
                  {t("bottom.terms")}
                </motion.span>
              </Link>
              <Link href="#">
                <motion.span whileHover={{ color: "#3B82F6" }}>
                  {t("bottom.cookies")}
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
