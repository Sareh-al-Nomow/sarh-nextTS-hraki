import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addAddress,
  AddAddressRequest,
  AddressResponse,
  getAddresses,
} from "@/lib/axios/addressAxios";
import Spinner from "../UI/SpinnerLoading";
import toast from "react-hot-toast";
import { validateAddressForm } from "@/utils/valiadtion/validateAddressForm";
import Modal from "../UI/Modal";
import { Address } from "@/models/frontEndAddress";
import { Country } from "@/models/forntEndCountry";

const AddressTap: React.FC<{
  setActiveTab: (tab: "information" | "shipping" | "payment") => void;
  UpdateOrderData: (name: string, data: number | null) => void;
  setSelectedAddress: (address: Address) => void;
  selectedAddress: Address | null;
  countries: Country[] | null;
  selectCountry: (country: Country) => void;
  selectedCountry: Country | null;
}> = ({
  setActiveTab,
  UpdateOrderData,
  selectedAddress,
  setSelectedAddress,
  countries,
  selectCountry,
  selectedCountry,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState<Address>(
    selectedAddress ?? {
      id: 0,
      full_name: "",
      phone_number: "",
      address_1: "",
      address_2: "",
      city_id: 0,
      country_id: 0,
      postcode: "",
    }
  );

  const [addressReady, setSAddressReady] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const { mutate: addNewAddress, isPending: isLoadingAddAddress } = useMutation(
    {
      mutationFn: addAddress,
      onSuccess: (data: AddressResponse) => {
        handleSelectAddress(data);
        refetch();
        toast.success("Address added successfully!");
      },
      onError: (error: Error) => {
        setAddressError((prev) =>
          prev ? [...prev, error.message] : [error.message]
        );
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "city_id" || name === "country_id" ? Number(value) : value,
    }));
    if (name === "country_id") {
      setSelectedAddress({
        ...formData,
        country_id: Number(value),
      });
      const filteredCountry = countries?.find((c) => c.id === Number(value));
      if (filteredCountry) {
        selectCountry(filteredCountry);
      }
    }
    if (name === "city_id") {
      setSelectedAddress({
        ...formData,
        city_id: Number(value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: AddAddressRequest = {
      address_1: String(formData["address_1"]),
      address_2: String(formData["address_2"]),
      full_name: String(formData["full_name"]),
      phone_number: String(formData["phone_number"]),
      postcode: String(formData["postcode"]),
      city_id: Number(formData["city_id"]),
      country_id: Number(formData["country_id"]),
    };
    console.log(payload);
    const errors = validateAddressForm(payload);
    if (errors.length > 0) {
      setAddressError(errors);
      setIsModalOpen(true);
      return;
    }
    addNewAddress(payload);
    setSAddressReady(true);
  };

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address);
    setDropdownOpen(false);
    setFormData({
      id: address.id,
      full_name: address.full_name,
      phone_number: address.phone_number,
      address_1: address.address_1,
      address_2: address.address_2,
      city_id: Number(address.city_id),
      country_id: Number(address.country_id),
      postcode: address.postcode,
    });

    const filteredCountry = countries?.find(
      (c) => c.id === Number(address.country_id)
    );

    if (filteredCountry) {
      selectCountry(filteredCountry);
    }
    setSAddressReady(true);
    setIsEditing(false);
    setShowCancelButton(false);
  }

  function handleStartEdit() {
    setIsEditing(true);
    setSAddressReady(false);
    setShowCancelButton(true);
    UpdateOrderData("addressId", null);
  }

  function handleCancelButton() {
    const enteredData: AddAddressRequest = {
      address_1: String(formData["address_1"]),
      address_2: String(formData["address_2"]),
      full_name: String(formData["full_name"]),
      phone_number: String(formData["phone_number"]),
      postcode: String(formData["postcode"]),
      city_id: Number(formData["city_id"]),
      country_id: Number(formData["country_id"]),
    };

    const errors = validateAddressForm(enteredData);
    if (errors.length > 0) {
      setAddressError(errors);
      setIsModalOpen(true);
      return;
    }

    setIsEditing(false);
    setSAddressReady(true);
    setShowCancelButton(false);
  }

  function handleFinishAddressFiled() {
    if (selectedAddress?.id) {
      UpdateOrderData("addressId", selectedAddress?.id);
      setActiveTab("shipping");
    } else {
      setAddressError((prev) => [...prev, "please select your address"]);
      setIsModalOpen(true);
    }
  }

  if (isLoading || isLoadingAddAddress)
    return (
      <div className="my-20">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center my-40">
        <h2>{error.message}</h2>
      </div>
    );

  return (
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
        <h2 className="text-xl font-medium text-gray-900">
          Contact Information
        </h2>

        {/* Dropdown to choose saved address */}
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center text-sm text-gray-700"
          >
            {selectedAddress
              ? `${selectedAddress.address_1}, ${selectedAddress.city_id}`
              : "Choose a saved address"}
            <FaChevronDown className="text-gray-500 ml-2" />
          </button>

          {dropdownOpen && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-2 shadow-md max-h-60 overflow-auto">
              {data &&
                data.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleSelectAddress(addr)}
                    className={`w-full text-left px-4 py-3 hover:bg-indigo-50 ${
                      selectedAddress?.id === addr.id ? "bg-indigo-100" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">
                          {addr.address_1}, {addr.address_2}, {addr.city_id},{" "}
                          {addr.country_id} {addr.postcode}
                        </p>
                      </div>
                      {selectedAddress?.id === addr.id && (
                        <FaCheck className="text-indigo-600 mt-1" />
                      )}
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>

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
              disabled={!isEditing}
              value={formData.full_name}
              onChange={handleChange}
              className={`${
                !isEditing && "opacity-60"
              } w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"`}
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
              disabled={!isEditing}
              value={formData.phone_number}
              onChange={handleChange}
              className={`${
                !isEditing && "opacity-60"
              } w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
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
              htmlFor="address_1"
              className={` opacity-60 block text-sm font-medium text-gray-700 mb-1`}
            >
              Address
            </label>
            <input
              type="text"
              id="address_1"
              name="address_1"
              disabled={!isEditing}
              value={formData.address_1}
              onChange={handleChange}
              className={`${
                !isEditing && "opacity-60"
              } w-full px-4 py-2 border border-gray-300 rounded-md`}
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
              disabled={!isEditing}
              value={formData.address_2}
              onChange={handleChange}
              className={`${
                !isEditing && "opacity-60"
              } w-full px-4 py-2 border border-gray-300 rounded-md`}
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div>
            <label
              htmlFor="country_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country_id"
              name="country_id"
              disabled={!isEditing}
              value={formData.country_id}
              onChange={handleChange}
              className={`${
                !isEditing && "opacity-60"
              } w-full px-4 py-2 border border-gray-300 rounded-md`}
            >
              <option value={0}>- Select Country</option>
              {countries &&
                countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label
                htmlFor="city_id"
                className={` block text-sm font-medium text-gray-700 mb-1`}
              >
                City
              </label>
              <select
                id="city_id"
                name="city_id"
                disabled={!isEditing}
                value={formData.city_id}
                onChange={handleChange}
                className={`${
                  !isEditing && "opacity-60"
                } w-full px-4 py-2 border border-gray-300 rounded-md`}
              >
                <option value={0}>- Select City</option>
                {selectedCountry.Cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}
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
            disabled={!isEditing}
            value={formData.postcode}
            onChange={handleChange}
            className={`${
              !isEditing && "opacity-60"
            } w-full px-4 py-2 border border-gray-300 rounded-md`}
            placeholder="10001"
          />
        </div>

        <div className="flex gap-5">
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={handleStartEdit}
              className="w-full  bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium"
            >
              Edit
            </motion.button>
          )}

          {showCancelButton && (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type={`button`}
              onClick={handleCancelButton}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium`}
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type={addressReady ? `button` : `submit`}
            onClick={addressReady ? handleFinishAddressFiled : () => {}}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition font-medium"
          >
            {addressReady ? "Continue to Shipping" : "Save Address"}
          </motion.button>
        </div>
      </motion.form>
    </>
  );
};

export default AddressTap;
