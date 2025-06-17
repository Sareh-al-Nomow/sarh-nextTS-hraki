"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiCreditCard,
  FiTruck,
  FiShield,
} from "react-icons/fi";

export default function Footer() {
  const t = useTranslations("footer");

  const footerSections = [
    {
      title: t("sections.shop.title"),
      items: t.raw("sections.shop.items") as string[],
    },
    {
      title: t("sections.service.title"),
      items: t.raw("sections.service.items") as string[],
    },
    {
      title: t("sections.about.title"),
      items: t.raw("sections.about.items") as string[],
    },
  ];

  const paymentMethods = t.raw("paymentMethods") as string[];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">ShopEase</h2>
            <p className="text-gray-400 mb-6">{t("description")}</p>
            <div className="flex space-x-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiYoutube].map(
                (Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ y: -3, color: "#3B82F6" }}
                    className="text-gray-400 hover:text-blue-500 text-xl"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Footer Sections Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item: string, i: number) => (
                  <li key={i}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: "#3B82F6" }}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {item}
                  </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            {
              icon: <FiTruck className="text-2xl" />,
              text: t("badges.shipping"),
            },
            {
              icon: <FiShield className="text-2xl" />,
              text: t("badges.warranty"),
            },
            {
              icon: <FiCreditCard className="text-2xl" />,
              text: t("badges.secure"),
            },
          ].map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-lg"
            >
              <div className="text-blue-500">{badge.icon}</div>
              <span className="text-sm font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-gray-800 p-3 rounded-md flex items-center gap-2"
            >
              <FiCreditCard />
              <span className="text-sm">{method}</span>
            </motion.div>
          ))}
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
              <motion.a href="#" whileHover={{ color: "#3B82F6" }}>
                {t("bottom.privacy")}
              </motion.a>
              <motion.a href="#" whileHover={{ color: "#3B82F6" }}>
                {t("bottom.terms")}
              </motion.a>
              <motion.a href="#" whileHover={{ color: "#3B82F6" }}>
                {t("bottom.cookies")}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
