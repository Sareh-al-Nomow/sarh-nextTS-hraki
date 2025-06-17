import { placeOrder } from "@/lib/axios/paymentAxios";
import { CartContext } from "@/store/CartContext";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const PaymentTap: React.FC = () => {
  const t = useTranslations("payment");
  const { updateCart } = useContext(CartContext);
  const router = useRouter();

  const { summaryCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash_on_delivery" | "stripe"
  >("stripe");

  console.log(paymentMethod);
  const { mutate } = useMutation({
    mutationFn: () =>
      placeOrder({
        cartId: summaryCart.cart_id,
        paymentMethod: paymentMethod,
      }),
    onSuccess: (data) => {
      console.log(data.paymentUrl);
      updateCart();
      if (paymentMethod === "stripe") {
        window.location.href = data.paymentUrl;
      } else {
        router.push("/success");
      }
    },
    onError: (error) => {
      toast.error(error?.message || t("errors.stripeFailed"));
    },
  });

  function handlePlaceOrder() {
    mutate();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-medium text-gray-900">{t("title")}</h2>

      <div className="space-y-4">
        <div
          onClick={() => setPaymentMethod("stripe")}
          className={`p-4 border rounded-md cursor-pointer ${
            paymentMethod === "stripe"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              id="credit-card"
              name="payment"
              checked={paymentMethod === "stripe"}
              onChange={() => {}}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label
              htmlFor="credit-card"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {t("methods.creditCard")}
            </label>
          </div>
        </div>

        <div
          onClick={() => setPaymentMethod("cash_on_delivery")}
          className={`p-4 border rounded-md cursor-pointer ${
            paymentMethod === "cash_on_delivery"
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              id="paypal"
              name="payment"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={() => {}}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label
              htmlFor="paypal"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {t("methods.cashOnDelivery")}
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            {t("terms")}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              {t("termsLinks.terms")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              {t("termsLinks.privacy")}
            </a>
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => {}}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {t("navigation.back")}
        </button>
        <motion.button
          onClick={handlePlaceOrder}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-medium"
        >
          {t("navigation.complete")}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentTap;
