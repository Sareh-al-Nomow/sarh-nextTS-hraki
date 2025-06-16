"use client";

import { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { newPasswordRequest } from "@/lib/axios/resetPasswordAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdFileDownloadDone } from "react-icons/md";

import { AuthModalContext } from "@/store/AuthModalContext";

type ResetPasswordProps = {
  params: Promise<{ token: string }>;
};
const ResetPasswordPage = ({ params }: ResetPasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incomingToken, setIncomingToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = use(params);

  const router = useRouter();
  const { openAuthModal } = useContext(AuthModalContext);

  useEffect(() => {
    setIncomingToken(token);
  }, [token]);

  const { mutate: mutateRestPassword, isPending: isPendingRestpassword } =
    useMutation({
      mutationFn: newPasswordRequest,
      onSuccess: (data) => {
        console.log("تم ارسال otp", data);
        setSuccess(true);
      },
      onError: (error: Error) => {
        console.log("خطأ أثناء otp:", error.message);
        toast.error(error.message);
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("password should be 8 charachter at least!");
      return;
    }
    mutateRestPassword({ newPassword: password, token: incomingToken });
    // Simulate API call
  };

  function handleSuccessButton() {
    openAuthModal();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="pr-bg p-6 text-center">
            <div className="flex justify-center mb-4">
              <FiLock className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {success ? "Password Updated!" : "Reset Your Password"}
            </h1>
            <p className="text-blue-100 mt-2">
              {success
                ? "Your password has been successfully updated."
                : "Enter your new password below"}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="mb-6 text-center flex justify-center">
                  <MdFileDownloadDone size={90} className="pr-text" />
                </div>
                <button
                  onClick={handleSuccessButton}
                  className="inline-flex items-center justify-center px-6 py-3 pr-bg text-white font-medium rounded-lg transition-colors"
                >
                  Back to Login
                  <FiArrowRight className="ml-2" />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {error && (
                    <p className=" text-red-400 text-center">{error}</p>
                  )}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter new password"
                        required
                        minLength={8}
                      />
                      <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Confirm new password"
                        required
                        minLength={8}
                      />
                      <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={
                    isPendingRestpassword || password !== confirmPassword
                  }
                  className={`w-full mt-6 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
                    isPendingRestpassword || password !== confirmPassword
                      ? "bg-gray-300 cursor-not-allowed"
                      : "pr-bg text-white"
                  }`}
                >
                  {isPendingRestpassword ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Password
                      <FiArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* Password requirements */}
        {!success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Password Requirements:
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                    password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                Minimum 8 characters
              </li>
              <li className="flex items-center">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                    /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                At least one uppercase letter
              </li>
              <li className="flex items-center">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                    /[0-9]/.test(password) ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                At least one number
              </li>
              <li className="flex items-center">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                    /[^A-Za-z0-9]/.test(password)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></span>
                At least one special character
              </li>
              <li className="flex items-center">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                    password === confirmPassword && confirmPassword.length > 0
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></span>
                Passwords match
              </li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
