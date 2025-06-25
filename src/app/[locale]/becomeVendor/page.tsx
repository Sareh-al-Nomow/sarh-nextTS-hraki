"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function BecomeVendorPage() {
  const t = useTranslations("BecomeVendor");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setStep("success");
      toast.success(t("form.success"));
    } catch {
      toast.error(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f7fafc] to-[#e2e8f0] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <FiCheckCircle className="text-green-500 text-6xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t("success.title")}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{t("success.message")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-[#1a7a9a] text-white rounded-lg hover:bg-[#156a87] transition-colors font-medium"
              >
                {t("success.homeButton")}
              </button>
              <button
                onClick={() => {
                  setStep("form");
                  setFormData({
                    name: "",
                    shopName: "",
                    email: "",
                    phone: "",
                  });
                }}
                className="px-6 py-3 border border-[#1a7a9a] text-[#1a7a9a] rounded-lg hover:bg-[#f0f9ff] transition-colors font-medium"
              >
                {t("success.newFormButton")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7fafc] to-[#e2e8f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#1a7a9a] hover:text-[#156a87] font-medium"
          >
            <FiArrowLeft className="mr-2" />
            {t("backButton")}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#1a7a9a] p-6 sm:p-8 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {t("title")}
            </h1>
            <p className="text-white/90">{t("description")}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.name")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a9a] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label
                  htmlFor="shopName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.shopName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a9a] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.email")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a9a] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.phone")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a7a9a] focus:border-transparent transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#1a7a9a] text-white py-3 px-6 rounded-lg hover:bg-[#156a87] transition-colors font-medium text-lg flex items-center justify-center ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("form.submitting")}
                    </>
                  ) : (
                    t("form.submit")
                  )}
                </button>
              </motion.div>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-600 text-sm"
        >
          <p>{t("footerText")}</p>
        </motion.div>
      </div>
    </div>
  );
}
