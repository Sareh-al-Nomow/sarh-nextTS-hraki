"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import { useState } from "react";
import { useTranslations } from "next-intl";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
};

export default function FAQPage() {
  const t = useTranslations("faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    {
      question: t("questions.shippingTime.question"),
      answer: t("questions.shippingTime.answer"),
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: t("questions.paymentMethods.question"),
      answer: t("questions.paymentMethods.answer"),
      category: "payments",
      icon: <FiCreditCard className="text-green-500" />,
    },
    {
      question: t("questions.returns.question"),
      answer: t("questions.returns.answer"),
      category: "returns",
      icon: <FiRefreshCw className="text-purple-500" />,
    },
    {
      question: t("questions.tracking.question"),
      answer: t("questions.tracking.answer"),
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: t("questions.internationalShipping.question"),
      answer: t("questions.internationalShipping.answer"),
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: t("questions.createAccount.question"),
      answer: t("questions.createAccount.answer"),
      category: "account",
      icon: <FiUser className="text-orange-500" />,
    },
  ];

  const categories = [
    { id: "all", name: t("categories.all") },
    { id: "shipping", name: t("categories.shipping") },
    { id: "payments", name: t("categories.payments") },
    { id: "returns", name: t("categories.returns") },
    { id: "account", name: t("categories.account") },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <motion.button
                layout
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{faq.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-gray-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 ml-14"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t("cta.title")}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              {t("cta.contactSupport")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300"
            >
              {t("cta.liveChat")}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
