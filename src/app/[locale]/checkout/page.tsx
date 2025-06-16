"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { CartContext } from "@/store/CartContext";
import Image from "next/image";
import AddressTap from "@/components/chechout/AddressTap";
import { redirect } from "next/navigation";
import { Address } from "@/models/frontEndAddress";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/lib/axios/countryAxios";
import { Country } from "@/models/forntEndCountry";
import Spinner from "@/components/UI/SpinnerLoading";
import Shipping from "@/components/chechout/Shipping";
import PaymentTap from "@/components/chechout/PaymentTap";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<
    "information" | "shipping" | "payment"
  >("information");

  const [countries, setCountries] = useState<Country[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [readyToPay, setReadyToPay] = useState<boolean>(false);

  const [dataReady, setDataready] = useState({
    addressReady: false,
    shippingReady: false,
  });

  interface OrderDataShape {
    addressId: number | null;
    delevaryMethodId: number | null;
  }
  const [orderData, setOrderData] = useState<OrderDataShape>({
    addressId: null,
    delevaryMethodId: null,
  });

  const {
    margeItems,
    summaryCart,
    saveOrderInfo,
    isLoadingSaveOrderData,
    isErrorSaveOrderData,
  } = useContext(CartContext);

  const {
    data: dataCountries,
    isLoading: isLoadingGetCountries,
    error: getCountriesError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  useEffect(() => {
    setCountries(dataCountries ?? null);
  }, [dataCountries]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderData]);

  function handleActiveTap(tap: "information" | "shipping" | "payment") {
    setActiveTab(tap);
  }

  function handleUpdateOrderData(name: string, data: number | null) {
    setOrderData((prev) => ({
      ...prev,
      [name]: data,
    }));
  }

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address);
  }

  function handleSelectCountry(country: Country) {
    setSelectedCountry(country);
  }

  function handleDataReady(data: string, state: boolean) {
    setDataready((prev) => ({
      ...prev,
      [data]: state,
    }));
  }

  function handleStartPayment() {
    if (orderData.addressId && orderData.delevaryMethodId) {
      console.log(" save order");
      saveOrderInfo(
        summaryCart.cart_id,
        orderData.addressId,
        orderData.delevaryMethodId
      );
    }

    console.log(orderData);

    if (isErrorSaveOrderData) return;
    setReadyToPay(true);
    setActiveTab("payment");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    redirect("/");
  }

  if (isLoadingGetCountries || isLoadingSaveOrderData) {
    return (
      <div className="my-20 mb-56">
        <Spinner />
      </div>
    );
  }

  if (getCountriesError) {
    return (
      <div className=" my-20 text-center">
        <h1 className="p-5">{getCountriesError.name}</h1>
        <p className="p-5">{getCountriesError.message}</p>
      </div>
    );
  }

  // if (isErrorSaveOrderData) {
  //   return (
  //     <div className=" my-20 text-center">
  //       <h1 className="p-5">Save Order Data Faild</h1>
  //       <p className="p-5">try to add your address and develary method again</p>
  //       <button
  //         onClick={() => router.push("/cart")}
  //         className="py-4 px-5 rounded-2xl bg-red-400 text-white"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

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
                        : `text-black `
                    }`}
                  >
                    Information
                  </button>
                  <button
                    disabled={!orderData.addressId}
                    onClick={() => setActiveTab("shipping")}
                    className={`flex-1 text-center pb-2 ${
                      activeTab === "shipping"
                        ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                        : `${
                            orderData.addressId
                              ? "text-black "
                              : "text-gray-500"
                          } `
                    }`}
                  >
                    Shipping
                  </button>
                  <button
                    disabled={!orderData.delevaryMethodId}
                    onClick={() => setActiveTab("payment")}
                    className={`flex-1 text-center pb-2 ${
                      activeTab === "payment"
                        ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                        : `${
                            orderData.delevaryMethodId
                              ? "text-black "
                              : "text-gray-500"
                          } `
                    }`}
                  >
                    Payment
                  </button>
                </div>
              </motion.div>

              {/* Information Tab */}
              {activeTab === "information" && (
                <AddressTap
                  setActiveTab={handleActiveTap}
                  UpdateOrderData={handleUpdateOrderData}
                  setSelectedAddress={handleSelectAddress}
                  selectedAddress={selectedAddress}
                  countries={countries}
                  selectCountry={handleSelectCountry}
                  selectedCountry={selectedCountry}
                  handleDataReady={handleDataReady}
                  dataReady={dataReady}
                />
              )}

              {/* Shipping Tab */}
              {activeTab === "shipping" &&
                (selectedCountry && orderData.addressId ? (
                  <Shipping
                    countryId={selectedCountry.id}
                    updateOrderData={handleUpdateOrderData}
                    startPayment={handleStartPayment}
                    selectedShippingMethod={orderData.delevaryMethodId}
                    orderData={orderData}
                  />
                ) : (
                  <div className="text-center my-20">
                    <h1>Please Select your Address...</h1>
                  </div>
                ))}

              {/* Payment Tab */}
              {activeTab === "payment" && readyToPay && <PaymentTap />}
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
