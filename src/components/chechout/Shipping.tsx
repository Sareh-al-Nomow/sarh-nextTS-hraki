import { getCountry } from "@/lib/axios/countryAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import Spinner from "../UI/SpinnerLoading";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const Shipping: React.FC<{
  countryId: number;
  updateOrderData: (name: string, data: number | null) => void;
  startPayment: () => void;
  selectedShippingMethod: number | null;
  orderData: {
    addressId: number | null;
    delevaryMethodId: number | null;
  };
}> = ({
  countryId,
  updateOrderData,
  orderData,
  selectedShippingMethod,
  startPayment,
}) => {
  const t = useTranslations("shipping");
  const { data, isLoading, error } = useQuery({
    queryKey: ["shipping"],
    queryFn: () => getCountry(countryId),
  });

  if (data?.ShippingZone && data.ShippingZone.length > 0) {
    console.log(data.ShippingZone[0].zone_methods);
  }

  function handleSelectDelevaryMethod(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedValue = e.target.value;
    console.log("Selected delivery method:", selectedValue ?? null);
    updateOrderData("delevaryMethodId", Number(selectedValue) ?? null);
  }

  function handleFinishSelectDelevary() {
    if (orderData.delevaryMethodId !== null) {
      startPayment();
    } else {
      toast.error(t("errors.selectMethod"));
    }
  }

  if (isLoading) {
    return (
      <div className="text-center my-40">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-40">
        <h1>{error.message}</h1>
      </div>
    );
  }

  if (!data || !data.ShippingZone || data.ShippingZone.length === 0) {
    return (
      <div className="text-center my-40">
        <h1>{t("noDelivery")}</h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-medium text-gray-900">{t("title")}</h2>

      <div className="space-y-4">
        {data.ShippingZone.map((shZo, index) => (
          <div key={index}>
            {shZo.zone_methods.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 border-gray-200 rounded-md hover:border-indigo-500 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={method.method.name}
                    name="shipping"
                    value={method.shipping_zone_method_id}
                    onChange={handleSelectDelevaryMethod}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    defaultChecked={
                      selectedShippingMethod !== null &&
                      selectedShippingMethod === method.shipping_zone_method_id
                    }
                  />
                  <label
                    htmlFor={method.method.name}
                    className=" block text-sm font-medium text-gray-700"
                  >
                    {method.method.name}
                  </label>
                </div>
                <span className="text-sm text-gray-600">${method.cost}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button className="text-indigo-600 hover:text-indigo-500 font-medium">
          {t("back")}
        </button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleFinishSelectDelevary}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-medium"
        >
          {t("continue")}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Shipping;
