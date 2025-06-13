import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import { useState } from "react";
import { restPasswordRequest } from "@/lib/axios/resetPasswordAxios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SecurityInfo = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [successResetPasswordRequest, setSuccessResetPasswordRequest] =
    useState<string | null>(null);

  const [formInput, setFormInput] = useState({
    email: "",
  });

  const {
    mutate: mutateRequestResetPassword,
    isPending: isPendingResetPassword,
  } = useMutation({
    mutationFn: restPasswordRequest,
    onSuccess: (data) => {
      setSuccessResetPasswordRequest(data.message);
      console.log("تم ارسال otp", data);
    },
    onError: (error: Error) => {
      console.log("خطأ أثناء rest password:", error.message);
      toast.error(error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // send aplly to change password  ...
  function handleForgetPassword() {
    console.log(formInput.email);
    mutateRequestResetPassword({ email: formInput.email });
  }

  function toggleOpenCloseModal() {
    setIsOpenModal((prev) => !prev);
    setSuccessResetPasswordRequest(null);
    setFormInput({ email: "" });
  }

  return (
    <>
      <Modal open={isOpenModal}>
        <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative z-[1500]">
          <button
            onClick={toggleOpenCloseModal}
            className="absolute top-3 right-3 text-5xl text-gray-300 hover:text-white"
            aria-label="إغلاق"
          >
            &times;
          </button>
          {successResetPasswordRequest ? (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center ">
                Forget Password
              </h2>
              <div className="space-y-4 text-center">
                <div>
                  <div className="flex justify-center">
                    <label className="block mb-2 text-gray-300">
                      We Send Reset Password Link to Your email
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleOpenCloseModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white cursor-pointer"
                >
                  Done
                </button>
                <div className="text-center my-4 text-sm"></div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center ">
                Forget Password
              </h2>
              <div className="space-y-4 text-center">
                <div>
                  <div className="flex justify-center">
                    <label className="block mb-2 text-gray-300">
                      Please Enter Your Email
                    </label>
                  </div>

                  <input
                    name="email"
                    type="string"
                    onChange={handleInputChange}
                    value={formInput.email}
                    className={`w-full p-2 rounded bg-slate-700 text-center border border-slate-600 focus:ring-blue-500 focus:outline-none focus:ring-2`}
                    placeholder="ادخل بريدك الأكتروني هنا لارسال رابط تغيير كلمة السر"
                  />
                </div>

                <button
                  disabled={isPendingResetPassword}
                  type="button"
                  onClick={handleForgetPassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white cursor-pointer"
                >
                  {isPendingResetPassword ? "... ارسال" : "ارسال"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
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
            </div>
            <button
              onClick={toggleOpenCloseModal}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-lg border border-blue-200 whitespace-nowrap"
            >
              Change Password
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SecurityInfo;
