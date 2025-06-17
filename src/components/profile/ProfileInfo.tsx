import { AuthContext } from "@/store/AuthContext";
import { validateUpdateUserFormData } from "@/utils/valiadtion/validateUserInfoFormData";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, UpdateUserRequest } from "@/lib/axios/userAxios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const ProfileInfo: React.FC = () => {
  const t = useTranslations("account.profile");

  const [userInfo, userInfoError] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    phone: "+1 (555) 123-4567",
    birthday: "2001-03-01",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { userData: UpdateUserRequest; userId: number }) =>
      updateProfile(data.userData, data.userId),
    onSuccess: (data) => {
      setUser(data);
      toast.success(t("updateSuccess"));
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || "",
        phone: user.phone_number || "",
        birthday: user.birthday
          ? new Date(user.birthday).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const errors = validateUpdateUserFormData({
      full_name: formData.name,
      phone_number: formData.phone,
      birthday: new Date(formData.birthday).toISOString(),
    });
    // Add your save logic here

    if (errors.length > 0) {
      console.log(errors);
      userInfoError(errors);
      setIsModalOpen(true);

      return;
    }

    if (user?.id === undefined) {
      toast.error(t("validationErrors"));
      return;
    }
    mutate({
      userData: {
        full_name: formData.name,
        phone_number: formData.phone,
        birthday: new Date(formData.birthday).toISOString(),
      },
      userId: user.id,
    });

    console.log(formData);
  };
  return (
    <>
      <Modal open={isModalOpen} classesName="pr-bg">
        <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative">
          <h2 className="text-xl font-bold mb-4 text-center">
            {t("validationErrors")}
          </h2>
          <ul className="space-y-2 px-4 list-disc">
            {userInfo.map((err, idx) => (
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
              {t("cancel")}
            </button>
          </div>
        </div>
      </Modal>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium"> {t("personalInfo")}</h2>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
              >
                {t("cancel")}
              </button>
              <button
                disabled={isPending}
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {isPending ? "Saving ..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
            >
              {t("editProfile")}
            </button>
          )}
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("fullName")}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {formData.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("birthday")}
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {formData.birthday}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("phoneNumber")}
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {formData.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileInfo;
