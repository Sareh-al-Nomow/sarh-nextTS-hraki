import {
  AddressResponse,
  deleteAddress,
  updateAddress,
  UpdateAddressRequest,
} from "@/lib/axios/addressAxios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Modal from "../UI/Modal";
import { validateUpdateAddressForm } from "@/utils/valiadtion/validateUpdateAddressForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

interface AddressInfoProp {
  address: AddressResponse;
}

const AddressInfo: React.FC<AddressInfoProp> = ({ address }) => {
  console.log(address);
  const [isEdtitng, setIsEditing] = useState(false);
  const [addressError, setAddressError] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutate: updateAddressMutation, isPending } = useMutation({
    mutationFn: ({
      addressId,
      data,
    }: {
      addressId: number;
      data: UpdateAddressRequest;
    }) => updateAddress(data, addressId),
    onSuccess: () => {
      // refetch();
      toast.success("Address Updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: Error) => {
      setAddressError((prev) =>
        prev ? [...prev, error.message] : [error.message]
      );
    },
  });

  const { mutate: deleteAddressMutation, isPending: isPendingDeleteAddress } =
    useMutation({
      mutationFn: deleteAddress,
      onSuccess: () => {
        // refetch();
        toast.success("Address Updated successfully!");
        setIsModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: (error: Error) => {
        setAddressError((prev) =>
          prev ? [...prev, error.message] : [error.message]
        );
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UpdateAddressRequest = {
      address_1: String(formData["address_1"]),
      address_2: String(formData["address_2"]),
      full_name: String(formData["full_name"]),
      phone_number: String(formData["phone_number"]),
      postcode: String(formData["postcode"]),
    };
    console.log(payload);
    const errors = validateUpdateAddressForm(payload);
    if (errors.length > 0) {
      setAddressError(errors);
      setIsModalOpen(true);
      return;
    }
    // addNewAddress(payload);
    updateAddressMutation({
      addressId: address.id,
      data: payload,
    });
  };

  const [formData, setFormData] = useState({
    full_name: address.full_name,
    phone_number: address.phone_number,
    address_1: address.address_1,
    address_2: address.address_2,
    city: address.city.name,
    countries: address.countries.name ?? " Jordan",
    postcode: address.postcode,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function handleToggleOpenEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleDeleteAddress() {
    deleteAddressMutation(address.id);
  }

  return (
    <div className="p-3 grid gap-2">
      <Modal open={isModalOpen}>
        <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative">
          <h2 className="text-xl font-bold mb-4 text-center">
            Delete Address :
            <span className=" text-red-300">{" " + address.address_1}</span>
          </h2>

          <div className="flex gap-5 justify-center text-center mt-4 text-sm">
            <button
              onClick={handleDeleteAddress}
              className="px-4 py-2 rounded-2xl bg-red-600"
            >
              {isPendingDeleteAddress ? "Deleteing ..." : "Delete"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-2xl bg-amber-600"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      {!isEdtitng ? (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium mb-2">{address.address_1}</h3>
            <div className="flex gap-3">
              <button
                onClick={handleToggleOpenEdit}
                className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700 whitespace-pre-line">
            {address.address_1 +
              " " +
              address.address_2 +
              " " +
              address.city.name +
              " " +
              address.countries.name}
          </p>
        </div>
      ) : (
        <>
          <Modal open={isModalOpen}>
            <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative">
              <h2 className="text-xl font-bold mb-4 text-center">
                Address input errors
              </h2>
              <ul className="space-y-2 px-4 list-disc">
                {addressError.map((err, idx) => (
                  <li
                    key={idx}
                    className="w-full transition-colors rounded text-red-300"
                  >
                    {err}
                  </li>
                ))}
              </ul>
              <div className="text-center mt-4 text-sm">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-2xl bg-amber-600"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-sm rounded-lg p-6 space-y-6 relative"
          >
            <h2 className="text-xl font-medium text-gray-900">Edit Address</h2>

            {/* Form Inputs */}
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
                  name="full_name"
                  id="full_name"
                  // disabled={!isEditing}
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  // disabled={!isEditing}
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={` w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="address_1"
                  className={` opacity-60 block text-sm font-medium text-gray-700 mb-1`}
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address_1"
                  name="address_1"
                  // disabled={!isEditing}
                  value={formData.address_1}
                  onChange={handleInputChange}
                  className={` w-full px-4 py-2 border border-gray-300 rounded-md`}
                  placeholder="123 Main St"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="address_2"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address Details (Optional)
                </label>
                <input
                  type="text"
                  id="address_2"
                  name="address_2"
                  // disabled={!isEditing}
                  value={formData.address_2}
                  onChange={handleInputChange}
                  className={` w-full px-4 py-2 border border-gray-300 rounded-md`}
                  placeholder="Apartment, suite, etc."
                />
              </div>

              <div>
                <label
                  htmlFor="country_id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  selected Country
                </label>
                <p className=" font-bold">Jordern</p>
              </div>

              <div>
                <label
                  htmlFor="city_id"
                  className={` block text-sm font-medium text-gray-700 mb-1`}
                >
                  Selected City
                </label>
                <p className=" font-bold">Irbid</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className={`
               w-full px-4 py-2 border border-gray-300 rounded-md`}
                placeholder="10001"
              />
            </div>

            <div className="flex gap-5">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type={`button`}
                onClick={handleToggleOpenEdit}
                disabled={isPending}
                className={`cursor-pointer w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium`}
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isPending}
                className={` cursor-pointer w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium ${
                  isPending && "opacity-50"
                }`}
              >
                {isPending ? "Saving..." : "Save"}
              </motion.button>
            </div>
          </motion.form>
        </>
      )}
    </div>
  );
};

export default AddressInfo;
