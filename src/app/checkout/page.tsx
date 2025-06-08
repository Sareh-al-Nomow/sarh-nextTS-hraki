"use client";

import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Head from "next/head";
import { CartContext } from "@/store/CartContext";
import Image from "next/image";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<
    "information" | "shipping" | "payment"
  >("information");
  const [paymentMethod, setPaymentMethod] = useState<
    "credit-card" | "paypal" | "apple-pay"
  >("credit-card");
  const [saveInfo, setSaveInfo] = useState(true);

  const { margeItems, summaryCart } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Checkout | Modern Shop</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              Complete Your Purchase
            </motion.h1>
            <p className="text-gray-600">
              Secure checkout with our encrypted payment system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Steps */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white shadow-sm rounded-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setActiveTab("information")}
                    className={`flex-1 text-center pb-2 ${
                      activeTab === "information"
                        ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Information
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`flex-1 text-center pb-2 ${
                      activeTab === "shipping"
                        ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Shipping
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`flex-1 text-center pb-2 ${
                      activeTab === "payment"
                        ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Payment
                  </button>
                </div>
              </motion.div>

              {/* Information Tab */}
              {activeTab === "information" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow-sm rounded-lg p-6 space-y-6"
                >
                  <h2 className="text-xl font-medium text-gray-900">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="full_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-medium text-gray-900 pt-4 border-t border-gray-200">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="addressop"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address Details (Optional)
                      </label>
                      <input
                        type="text"
                        id="addressop"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="New York"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="10001"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="save-info"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="save-info"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Save this information for next time
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveTab("shipping")}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium"
                  >
                    Continue to Shipping
                  </motion.button>
                </motion.div>
              )}

              {/* Shipping Tab */}
              {activeTab === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow-sm rounded-lg p-6 space-y-6"
                >
                  <h2 className="text-xl font-medium text-gray-900">
                    Shipping Method
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="standard"
                          name="shipping"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          defaultChecked
                        />
                        <label
                          htmlFor="standard"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Standard Shipping
                        </label>
                      </div>
                      <span className="text-sm text-gray-600">$9.99</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="express"
                          name="shipping"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor="express"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Express Shipping
                        </label>
                      </div>
                      <span className="text-sm text-gray-600">$19.99</span>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-indigo-500 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="free"
                          name="shipping"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor="free"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Free Shipping (5-7 business days)
                        </label>
                      </div>
                      <span className="text-sm text-gray-600">$0.00</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setActiveTab("information")}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      ← Back to Information
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setActiveTab("payment")}
                      className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-medium"
                    >
                      Continue to Payment
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Payment Tab */}
              {activeTab === "payment" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow-sm rounded-lg p-6 space-y-6"
                >
                  <h2 className="text-xl font-medium text-gray-900">
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    <div
                      onClick={() => setPaymentMethod("credit-card")}
                      className={`p-4 border rounded-md cursor-pointer ${
                        paymentMethod === "credit-card"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit-card"
                          name="payment"
                          checked={paymentMethod === "credit-card"}
                          onChange={() => {}}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor="credit-card"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Credit Card
                        </label>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 border rounded-md cursor-pointer ${
                        paymentMethod === "paypal"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="paypal"
                          name="payment"
                          checked={paymentMethod === "paypal"}
                          onChange={() => {}}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor="paypal"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          PayPal
                        </label>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("apple-pay")}
                      className={`p-4 border rounded-md cursor-pointer ${
                        paymentMethod === "apple-pay"
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="apple-pay"
                          name="payment"
                          checked={paymentMethod === "apple-pay"}
                          onChange={() => {}}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label
                          htmlFor="apple-pay"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          Apple Pay
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
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setActiveTab("shipping")}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      ← Back to Shipping
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-medium"
                    >
                      Complete Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white shadow-sm rounded-lg p-6 h-fit sticky top-8"
              >
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {margeItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <div className="relative w-12 h-12 rounded bg-gray-200 mr-3 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.product_name || "Product image"}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.product_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${summaryCart.grandTotal}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        ${summaryCart.subTotal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        ${summaryCart.shippingFee ?? 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">
                        ${summaryCart.tax ?? 0}
                      </span>
                    </div>
                    {summaryCart.discount && (
                      <div className="flex justify-between">
                        <span className="text-red-300">Discount</span>
                        <span className="text-red-300 line-through">
                          ${summaryCart.discount ?? 0}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-medium text-gray-900">
                        ${summaryCart.grandTotal ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CheckoutPage;
