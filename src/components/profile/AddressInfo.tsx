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
import { useTranslations } from "next-intl";

interface AddressInfoProp {
  address: AddressResponse;
}

const AddressInfo: React.FC<AddressInfoProp> = ({ address }) => {
  const t = useTranslations("account.addressInfo");

  const [isEditing, setIsEditing] = useState(false);
  const [addressError, setAddressError] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log(addressError);
  const { mutate: updateAddressMutation, isPending } = useMutation({
    mutationFn: ({
      addressId,
      data,
    }: {
      addressId: number;
      data: UpdateAddressRequest;
    }) => updateAddress(data, addressId),
    onSuccess: () => {
      toast.success(t("toast.update"));
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
        toast.success(t("toast.delete"));
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
    const errors = validateUpdateAddressForm(payload);
    if (errors.length > 0) {
      setAddressError(errors);
      setIsModalOpen(true);
      return;
    }
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
    countries: address.countries.name ?? "Jordan",
    postcode: address.postcode,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-3 grid gap-2">
      <Modal open={isModalOpen} classesName="pr-bg">
        <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative">
          <h2 className="text-xl font-bold mb-4 text-center">
            {t("modal.title")}{" "}
            <span className="text-red-300">{" " + address.address_1}</span>
          </h2>

          <div className="flex gap-5 justify-center text-center mt-4 text-sm">
            <button
              onClick={() => deleteAddressMutation(address.id)}
              className="px-4 py-2 rounded-2xl bg-red-600"
            >
              {isPendingDeleteAddress ? t("modal.deleting") : t("modal.delete")}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-2xl bg-amber-600"
            >
              {t("modal.close")}
            </button>
          </div>
        </div>
      </Modal>

      {!isEditing ? (
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-medium mb-2">{address.address_1}</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer"
              >
                {t("edit")}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-red-600 hover:text-red-800 text-sm cursor-pointer"
              >
                {t("delete")}
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
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-sm rounded-lg p-6 space-y-6 relative"
        >
          <h2 className="text-xl font-medium text-gray-900">
            {t("form.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.fullName")}
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.phone")}
              </label>
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label
                htmlFor="address_1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.address1")}
              </label>
              <input
                type="text"
                id="address_1"
                name="address_1"
                value={formData.address_1}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="address_2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.address2")}
              </label>
              <input
                type="text"
                id="address_2"
                name="address_2"
                value={formData.address_2}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.country")}
              </label>
              <p className="font-bold">Jordan</p>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("form.city")}
              </label>
              <p className="font-bold">Irbid</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("form.postcode")}
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex gap-5">
            <motion.button
              type="button"
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium"
            >
              {t("form.cancel")}
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isPending}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium ${
                isPending ? "opacity-50" : ""
              }`}
            >
              {isPending ? t("form.saving") : t("form.save")}
            </motion.button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default AddressInfo;
