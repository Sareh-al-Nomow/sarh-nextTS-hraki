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

import React from "react";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
};

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders ship within 1-2 business days and arrive in 3-5 business days. Express shipping options are available at checkout.",
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay. All payments are securely processed.",
      category: "payments",
      icon: <FiCreditCard className="text-green-500" />,
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes! We offer free returns within 30 days of purchase. Items must be unused and in original packaging. Visit our Returns Center to initiate a return.",
      category: "returns",
      icon: <FiRefreshCw className="text-purple-500" />,
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also check order status by logging into your account.",
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination.",
      category: "shipping",
      icon: <FiTruck className="text-blue-500" />,
    },
    {
      question: "How do I create an account?",
      answer:
        "Click 'Sign Up' in the top navigation. You can also create an account during checkout by selecting 'Save my information for next time'.",
      category: "account",
      icon: <FiUser className="text-orange-500" />,
    },
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "shipping", name: "Shipping" },
    { id: "payments", name: "Payments" },
    { id: "returns", name: "Returns" },
    { id: "account", name: "Account" },
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about orders, shipping, returns,
            and more.
          </p>
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
            Still need help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to assist you with any
            questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300"
            >
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
