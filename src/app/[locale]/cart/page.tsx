"use client";

import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/store/CartContext";
import Spinner from "@/components/UI/SpinnerLoading";
import Image from "next/image";
import { BiX } from "react-icons/bi";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency } from "@/store/CurrencyContext";

const CartPage = () => {
  const {
    isLoadingCart,
    getCartError,
    margeItems,
    updateCartItemQuantity,
    isLoadingUpdateCartQuantity,
    deleteCartItem,
    isLoadingDeleteCartItem,
    summaryCart,
    applyCoupon,
    deleteAppliedCoupon,
  } = useContext(CartContext);

  const { rate, userCurrency } = useCurrency();

  function converPrice(price: number) {
    return price * rate;
  }

  const t = useTranslations("cart");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const defualtCoupon = summaryCart.coupon ? summaryCart.coupon : "";
  const [coupon, setCoupon] = useState<string>(defualtCoupon);

  const router = useRouter();

  const updateQuantity = (id: number, newQuantity: number) => {
    console.log("id is :", id, "  ", "newQuantity :", newQuantity);
    updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id: number) => {
    console.log("removeItem : ", id);
    deleteCartItem(id);
  };

  const handleApplyCoupon = () => {
    console.log("coupon : ", coupon);
    applyCoupon(coupon);
  };

  const handleDeletAppliedCoupon = (cartId: number) => {
    console.log("delete applied coupon cartid : ", cartId);
    deleteAppliedCoupon(cartId);
  };

  const handleGoToCheckout = () => {
    router.push("checkout");
  };

  if (isLoadingCart) {
    return (
      <div className="my-40">
        <Spinner />
      </div>
    );
  }

  if (getCartError) {
    <div className=" my-20 text-center">
      <h1 className="p-5">{getCartError.name}</h1>
      <p className="p-5">{getCartError.message}</p>
    </div>;
  }

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("title")}{" "}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {margeItems.length}{" "}
                    {margeItems.length === 1 ? null : margeItems.length}
                    {margeItems.length === 1 ? t("Item") : t("Items")}{" "}
                    {t("inCart")}
                  </h2>
                </div>

                {margeItems.length === 0 ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-12 text-center"
                  >
                    <p className="text-gray-500 mb-4">
                      {t("emptyCart.message")}
                    </p>
                    <Link
                      href={"/"}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      {t("emptyCart.continueShopping")}
                    </Link>
                  </motion.div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {margeItems.map((item, index) => (
                      <motion.li
                        key={item.cart_item_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <div className="w-24 h-24 rounded-md bg-gray-200 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.product_name || "Product image"}
                              className="w-full h-full object-cover"
                              width={96}
                              height={96}
                              unoptimized
                            />
                          </div>

                          <div className="mt-4 sm:mt-0 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.product_name}
                              </h3>
                              <button
                                disabled={isLoadingDeleteCartItem}
                                onClick={() => removeItem(item.cart_item_id)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                              <span>{item.color}</span>
                              <span className="mx-2">•</span>
                              <span>{item.size}</span>
                            </div> */}

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  disabled={
                                    isLoadingUpdateCartQuantity && isLoadingCart
                                  }
                                  onClick={() =>
                                    updateQuantity(
                                      item.cart_item_id,
                                      item.qty - 1
                                    )
                                  }
                                  className={`${
                                    isLoadingUpdateCartQuantity &&
                                    isLoadingCart &&
                                    " cursor-none"
                                  } px-3 py-1 text-gray-600 hover:bg-gray-100`}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1">{item.qty}</span>
                                <button
                                  disabled={
                                    isLoadingUpdateCartQuantity && isLoadingCart
                                  }
                                  onClick={() =>
                                    updateQuantity(
                                      item.cart_item_id,
                                      item.qty + 1
                                    )
                                  }
                                  className={`${
                                    isLoadingUpdateCartQuantity &&
                                    isLoadingCart &&
                                    " cursor-none"
                                  } px-3 py-1 text-gray-600 hover:bg-gray-100`}
                                >
                                  +
                                </button>
                              </div>

                              <p className="text-lg font-medium text-gray-900">
                                {userCurrency}{" "}
                                {converPrice(
                                  Number(
                                    (item.product_price * item.qty).toFixed(2)
                                  )
                                ).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Order Summary */}

            <div className="flex flex-col gap-5" dir={isRTL ? "rtl" : "ltr"}>
              {/* Order Cart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white shadow-sm rounded-lg p-6 h-fit top-8"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  {t("orderSummary.title")}
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("orderSummary.subtotal")}
                    </span>
                    <span className="text-gray-900">
                      {userCurrency}{" "}
                      {converPrice(Number(summaryCart.subTotal ?? 0)).toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("orderSummary.tax")}
                    </span>
                    <span className="text-gray-900">
                      {userCurrency}{" "}
                      {converPrice(Number(summaryCart.tax ?? 0)).toFixed(2)}
                    </span>
                  </div>

                  {summaryCart.discount && (
                    <div className="flex justify-between">
                      <span className="text-red-300">
                        {t("orderSummary.discount")}
                      </span>
                      <span className="text-red-300 line-through">
                        {userCurrency}{" "}
                        {converPrice(Number(summaryCart.discount ?? 0)).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-medium text-gray-900">
                      {t("orderSummary.total")}
                    </span>
                    <span className="font-medium text-gray-900">
                      {userCurrency}{" "}
                      {converPrice(Number(summaryCart.grandTotal ?? 0)).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={handleGoToCheckout}
                  disabled={margeItems.length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${
                    margeItems.length > 0 ? "opacity-100" : "opacity-45"
                  } cursor-pointer mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium`}
                >
                  {t("checkout")}
                </motion.button>

                <div className="mt-6 flex justify-center text-sm text-gray-500">
                  <p>
                    {t("orContinue")}

                    <Link
                      href={"/"}
                      className="text-indigo-600 hover:text-indigo-500 cursor-pointer "
                    >
                      {t("emptyCart.continueShopping")}
                    </Link>
                  </p>
                </div>
              </motion.div>

              {/* Order Coupon */}
              <div dir={isRTL ? "rtl" : "ltr"}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white shadow-sm rounded-lg p-6 h-fit sticky top-8"
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    {t("coupon.title")}
                  </h2>

                  <div>
                    {summaryCart.coupon ? (
                      <div className="flex justify-between">
                        <span>
                          {t("coupon.title")}
                          <span className="text-indigo-600">
                            {" "}
                            {summaryCart.coupon}
                          </span>{" "}
                          {t("coupon.applied")}
                        </span>
                        <button
                          onClick={() =>
                            handleDeletAppliedCoupon(summaryCart.cart_id)
                          }
                          className="text-gray-900"
                        >
                          <BiX className="text-3xl text-red-400 cursor-pointer"></BiX>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            placeholder={t("coupon.placeholder")}
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {!summaryCart.coupon && (
                    <motion.button
                      onClick={handleApplyCoupon}
                      disabled={margeItems.length === 0}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${
                        margeItems.length > 0 ? "opacity-100" : "opacity-45"
                      } cursor-pointer mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium`}
                    >
                      {t("coupon.apply")}
                    </motion.button>
                  )}
                </motion.div>
              </div>

              {/* Payment Methods - Text Only */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white shadow-sm rounded-lg p-6"
              >
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  {t("paymentMethods.title")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {t("paymentMethods.visa")}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {t("paymentMethods.cashOnDelivery")}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {t("paymentMethods.mastercard")}
                  </span>

                  {/* <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    PayPal
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Apple Pay
                  </span> */}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartPage;
