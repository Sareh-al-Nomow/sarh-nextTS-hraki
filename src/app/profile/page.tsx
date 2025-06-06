"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiCreditCard,
  FiMapPin,
  FiBell,
  FiLogOut,
} from "react-icons/fi";
import Image from "next/image";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B\nNew York, NY 10001",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here
  };

  const accountTabs = [
    { id: "profile", icon: <FiUser size={18} />, label: "Profile" },
    { id: "security", icon: <FiLock size={18} />, label: "Security" },
    { id: "payments", icon: <FiCreditCard size={18} />, label: "Payments" },
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
                    src="/image/users/myPicture.jpg"
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
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Personal Information</h2>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
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
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">
                          {formData.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="px-4 py-2 bg-gray-50 rounded-lg whitespace-pre-line">
                        {formData.address}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden space-y-6"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-medium">Password & Security</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-600">
                        Last changed 3 months ago
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-lg border border-blue-200 whitespace-nowrap">
                      Change Password
                    </button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-3">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Payment Methods</h2>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                    Add Payment Method
                  </button>
                </div>
                <div className="p-6">
                  <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 04/2025</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">MC</span>
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 5555</p>
                        <p className="text-sm text-gray-500">Expires 08/2024</p>
                      </div>
                    </div>
                    <button className="text-sm text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Saved Addresses</h2>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                    Add New Address
                  </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium mb-2">Primary Address</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      123 Main St, Apt 4B\nNew York, NY 10001
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium mb-2">Work Address</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      456 Business Ave\nSuite 1200\nNew York, NY 10005
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-medium">
                    Notification Preferences
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                          defaultChecked
                        />
                        <span>Order updates</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                          defaultChecked
                        />
                        <span>Promotions and offers</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                        />
                        <span>Product recommendations</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Push Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                          defaultChecked
                        />
                        <span>Order status changes</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                        />
                        <span>New arrivals</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600"
                          defaultChecked
                        />
                        <span>Account activity</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
