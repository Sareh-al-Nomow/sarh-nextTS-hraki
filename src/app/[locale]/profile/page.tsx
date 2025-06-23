"use client";

import { useContext, useEffect, useState } from "react";
import { FiUser, FiLock, FiMapPin, FiBell } from "react-icons/fi";
import Image from "next/image";
import { AuthContext } from "@/store/AuthContext";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SecurityInfo from "@/components/profile/SecurityInfo";
import AddressesInfo from "@/components/profile/Addresses";
import Settings from "@/components/profile/Settings";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("account");
  const { user, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    avatar: "/image/users/default-avatar.jpg",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        birthday: user.birthday ? user.birthday.slice(0, 10) : "",
        avatar: user.avatar || "/image/users/default-avatar.jpg",
      });
    }
  }, [user]);

  const accountTabs = [
    { id: "profile", icon: <FiUser size={18} />, label: t("tabs.profile") },
    { id: "security", icon: <FiLock size={18} />, label: t("tabs.security") },

    {
      id: "addresses",
      icon: <FiMapPin size={18} />,
      label: t("tabs.addresses"),
    },
    {
      id: "notifications",
      icon: <FiBell size={18} />,
      label: t("tabs.notifications"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("title")}
            </h1>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>
          <div className="">
            <button
              className="text-white bg-red-600 hover:bg-red-700 text-lg px-6 py-2 rounded-xl transition-all shadow-md"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6 flex flex-col items-center border-b border-gray-100">
                <div className="relative w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-2 border-white shadow-md">
                  {user?.avatar ? (
                    <Image
                      src={formData?.avatar}
                      alt={t("avatarAlt")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <Image
                      src={"/image/users/user.png"}
                      alt={t("avatarAlt")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <h3 className="font-medium text-gray-900 text-center text-lg">
                  {formData.name || t("guest")}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  {formData.email || t("noEmail")}
                </p>
              </div>
              <nav className="p-2 space-y-1">
                {accountTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${
                        activeTab === tab.id ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span className="text-left">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 min-h-[500px]">
              {activeTab === "profile" && <ProfileInfo />}
              {activeTab === "security" && <SecurityInfo />}
              {activeTab === "addresses" && <AddressesInfo />}
              {activeTab === "notifications" && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
