import { getCountry } from "@/lib/axios/countryAxios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import Spinner from "../UI/SpinnerLoading";

const Shipping: React.FC<{
  countryId: number;
  updateOrderData: (name: string, data: number | null) => void;
  startPayment: () => void;
  selecteDelevaryMethodId: (id: number | null) => void;
  selectedDelevaryMethodId: number | null;
}> = ({
  countryId,
  updateOrderData,
  startPayment,
  selecteDelevaryMethodId,
  selectedDelevaryMethodId,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["shipping"],
    queryFn: () => getCountry(countryId),
  });

  if (data?.ShippingZone && data.ShippingZone.length > 0) {
    console.log(data.ShippingZone[0].zone_methods);
  }

  console.log("SHIPPING COMPONENT");

  function handleSelectDelevaryMethod(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedValue = e.target.value;
    console.log("Selected delivery method:", selectedValue);
    selecteDelevaryMethodId(Number(selectedValue));
  }

  function handleFinishSelectDelevary() {
    updateOrderData("delevaryMethodId", selectedDelevaryMethodId ?? null);
    startPayment();
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
        <h1>No Available Delevary at your Region!</h1>{" "}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm rounded-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-medium text-gray-900">Shipping Method</h2>

      <div className="space-y-4">
        {data.ShippingZone.map((shZo, index) => (
          <div key={index}>
            {shZo.zone_methods.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4  border-gray-200 rounded-md hover:border-indigo-500 cursor-pointer"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={method.method.name}
                    name="shipping"
                    value={method.shipping_zone_method_id}
                    onChange={handleSelectDelevaryMethod}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 "
                    defaultChecked={
                      selectedDelevaryMethodId !== null &&
                      selectedDelevaryMethodId === method.shipping_zone_method_id
                    }
                  />
                  <label
                    htmlFor={method.method.name}
                    className="ml-3 block text-sm font-medium text-gray-700"
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
        <button
          //   onClick={() => setActiveTab("information")}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          ← Back to Information
        </button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleFinishSelectDelevary}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-medium"
        >
          Continue to Payment
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Shipping;
