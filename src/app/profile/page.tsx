"use client";

import { useContext, useEffect, useState } from "react";
import { FiUser, FiLock, FiMapPin, FiBell, FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { AuthContext } from "@/store/AuthContext";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SecurityInfo from "@/components/profile/SecurityInfo";
import AddressesInfo from "@/components/profile/Addresses";
import { AiFillProduct } from "react-icons/ai";
import Settings from "@/components/profile/Settings";
import MyProducts from "@/components/profile/MyProdcuts";

export default function AccountPage() {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "2001-03-01",
    avatar: "/image/users/myPicture.jpg",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        birthday: user.birthday ? user.birthday.slice(0, 10) : "", // convert to YYYY-MM-DD if needed
        avatar: user.avatar ?? "",
      });
    }
  }, [user]);

  const accountTabs = [
    { id: "profile", icon: <FiUser size={18} />, label: "Profile" },
    { id: "security", icon: <FiLock size={18} />, label: "Security" },
    {
      id: "myproducts",
      icon: <AiFillProduct size={18} />,
      label: "My Products",
    },
    { id: "addresses", icon: <FiMapPin size={18} />, label: "Addresses" },
    { id: "notifications", icon: <FiBell size={18} />, label: "Notifications" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your personal information and preferences
            </p>
          </div>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors">
            <FiLogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-gray-100">
                <div className="relative w-20 h-20 rounded-full bg-gray-100 mb-4 overflow-hidden">
                  <Image
                    src={formData.avatar}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-center">
                  {formData.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {formData.email}
                </p>
              </div>
              <nav className="p-2">
                {accountTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${
                        activeTab === tab.id ? "text-blue-500" : "text-gray-400"
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && <ProfileInfo />}

            {activeTab === "security" && <SecurityInfo />}

            {activeTab === "myproducts" && <MyProducts />}

            {activeTab === "addresses" && <AddressesInfo />}

            {activeTab === "notifications" && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
}
