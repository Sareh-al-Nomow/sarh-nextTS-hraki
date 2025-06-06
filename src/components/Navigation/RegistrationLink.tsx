"use client";

import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import { FcGoogle } from "react-icons/fc";
import { GoSignIn } from "react-icons/go";
import { useMutation } from "@tanstack/react-query";
import { signUp, SignUpRequest } from "@/lib/axios/signUpAxios";
import toast from "react-hot-toast";
import { login, loginRequest } from "@/lib/axios/loginAxios";
import { otpRequest, otpVerify } from "@/lib/axios/otpAxios";
import { AuthContext } from "@/store/AuthContext";

export default function RegistrationLink() {
  const { login: loginCxt } = useContext(AuthContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contentView, setContentView] = useState<string | null>("otp");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    pass: "",
    phone: "",
    agreePolicy: false,
    otp: "",
  });

  // signup mutation field .....
  const { mutate: mutateSignup, isPending: isPendingSignup } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("تم إنشاء الحساب بنجاح", data);
      setContentView("otp");
    },
    onError: (error: Error) => {
      console.log("خطأ أثناء التسجيل:", error.message);
      toast.error(error.message);
    },
  });

  // login mutation field .....
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("تم إنشاء الحساب بنجاح", data);
      console.log(data);
      loginCxt(data.token, data.user);
      handlerResetForm();
    },
    onError: (error: Error) => {
      console.log("خطأ أثناء التسجيل:", error.message);
      toast.error(error.message);
    },
  });

  // otp mutation field .....
  const { mutate: mutateOtp, isPending: isPendingOtp } = useMutation({
    mutationFn: otpVerify,
    onSuccess: (data) => {
      console.log("تم ارسال otp", data);
      loginCxt(data.token, data.user);
      handlerResetForm();
      handleCloseModal();
    },
    onError: (error: Error) => {
      console.log("خطأ أثناء otp:", error.message);
      toast.error(error.message);
    },
  });

  // update state data every change ...
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // forms actions field ....

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formInput.email) newErrors.email = "يرجى تعبئة البريد الإلكتروني";
    if (!formInput.pass) newErrors.pass = "يرجى تعبئة كلمة المرور";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("تسجيل الدخول:", formInput);
      const payload: loginRequest = {
        email: formInput.email,
        password: formInput.pass,
      };
      mutateLogin(payload);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formInput.name) newErrors.name = "الاسم مطلوب";
    if (!formInput.email) newErrors.email = "البريد الإلكتروني مطلوب";
    if (!formInput.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formInput.pass) newErrors.pass = "كلمة المرور مطلوبة";

    const generalPhoneRegex = /^[0-9]{8,15}$/;
    if (formInput.phone && !generalPhoneRegex.test(formInput.phone)) {
      newErrors.phone = "رقم الهاتف غير صالح";
    }

    if (!formInput.agreePolicy)
      newErrors.agreePolicy = "يجب الموافقة على سياسة الخصوصية";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("إنشاء الحساب:", formInput);

      const payload: SignUpRequest = {
        full_name: formInput.name,
        email: formInput.email,
        password: formInput.pass,
        phone_number: formInput.phone,
      };
      mutateSignup(payload);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (formInput.otp.length !== 6) newErrors.otp = "OTP يرجى تعبئة";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("تاكيد otp ", formInput);
      const payload: otpRequest = {
        email: formInput.email,
        otp: formInput.otp,
      };
      mutateOtp(payload);
    }
  };

  // handle close modal and rest it ...
  function handleCloseModal() {
    setIsOpenModal(false);
    setContentView("login");
  }

  // handle reset and clear inputs form ...
  function handlerResetForm() {
    setFormInput({
      name: "",
      email: "",
      pass: "",
      phone: "",
      agreePolicy: false,
      otp: "",
    });
  }

  return (
    <>
      <GoSignIn
        className="pr-text text-2xl cursor-pointer"
        onClick={() => {
          setIsOpenModal(true);
          setErrors({});
        }}
      />

      <Modal open={isOpenModal}>
        <div className="pr-bg text-white rounded-2xl w-full max-w-md p-6 relative">
          {/* زر الإغلاق */}
          <button
            onClick={handleCloseModal}
            className="absolute top-3 right-3 text-2xl text-gray-300 hover:text-white"
            aria-label="إغلاق"
          >
            &times;
          </button>

          {contentView === "login" && (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">
                تسجيل الدخول
              </h2>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">
                      البريد الإلكتروني
                    </label>
                    {errors.email && (
                      <span className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <input
                    name="email"
                    type="email"
                    value={formInput.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">كلمة المرور</label>
                    {errors.pass && (
                      <p className="text-red-400 text-sm mt-1">{errors.pass}</p>
                    )}
                  </div>

                  <input
                    name="pass"
                    type="password"
                    value={formInput.pass}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.pass
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  disabled={isPendingLogin}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white"
                >
                  {isPendingLogin ? "... تسجيل الدخول" : "تسجيل الدخول"}
                </button>
              </form>

              <div className="text-center my-4 text-sm">
                ليس لديك حساب؟{" "}
                <button
                  onClick={() => {
                    setContentView("signup");
                    setErrors({});
                  }}
                  className="text-blue-400 hover:underline"
                >
                  إنشاء حساب
                </button>
              </div>

              <div className="text-center">
                <button className="flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 w-full py-2 rounded">
                  <FcGoogle className="text-xl" />
                  <span>تسجيل الدخول عبر Google</span>
                </button>
              </div>
            </>
          )}

          {contentView === "signup" && (
            <>
              <h2 className="text-xl font-bold mb-2 text-center">
                إنشاء حساب جديد
              </h2>

              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">الاسم الكامل</label>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <input
                    name="name"
                    type="text"
                    value={formInput.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-green-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="الاسم الكامل"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">رقم الهاتف</label>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <input
                    name="phone"
                    type="tel"
                    value={formInput.phone}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-green-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="078XXXXXXXX"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">
                      البريد الإلكتروني
                    </label>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <input
                    name="email"
                    type="email"
                    value={formInput.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-green-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 text-sm">كلمة المرور</label>
                    {errors.pass && (
                      <p className="text-red-400 text-sm mt-1">{errors.pass}</p>
                    )}
                  </div>

                  <input
                    name="pass"
                    type="password"
                    value={formInput.pass}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded bg-slate-700 border ${
                      errors.pass
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-green-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      id="agree"
                      type="checkbox"
                      name="agreePolicy"
                      checked={formInput.agreePolicy}
                      onChange={handleInputChange}
                      className={`${
                        errors.agreePolicy ? "border-red-500" : ""
                      }`}
                    />
                    <label htmlFor="agree">أوافق على سياسة الخصوصية</label>
                  </div>

                  {errors.agreePolicy && (
                    <p className="text-red-400 text-sm mt-1 text-end">
                      {errors.agreePolicy}
                    </p>
                  )}
                </div>

                <button
                  disabled={isPendingSignup}
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded text-white cursor-pointer"
                >
                  {isPendingSignup ? "... تسجيل" : " إنشاء حساب"}
                </button>
              </form>

              <div className="text-center mt-4">
                <button className="flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 w-full py-2 rounded">
                  <FcGoogle className="text-xl" />
                  <span>تسجيل الدخول عبر Google</span>
                </button>
              </div>

              <div className="text-center mt-4 text-sm">
                لديك حساب؟{" "}
                <button
                  onClick={() => {
                    setContentView("login");
                    setErrors({});
                  }}
                  className="text-green-400 hover:underline"
                >
                  تسجيل الدخول
                </button>
              </div>
            </>
          )}

          {contentView === "otp" && (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">OTP</h2>
              <form
                className="space-y-4 text-center"
                onSubmit={handleVerifyOtp}
              >
                <div>
                  <div className="flex justify-between">
                    <label className="block mb-1 ">
                      We Sent OTP To :{" "}
                      <span className="text-sm text-gray-400">
                        {" "}
                        {formInput.email}
                      </span>{" "}
                    </label>
                    {errors.otp && (
                      <span className="text-red-400 text-sm mt-1">
                        {errors.otp}
                      </span>
                    )}
                  </div>

                  <input
                    name="otp"
                    type="string"
                    onChange={handleInputChange}
                    value={formInput.otp}
                    className={`w-full p-2 rounded bg-slate-700 text-center border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2`}
                    placeholder="ادخل 6 رموز هنا لتأكيد حسابك"
                  />
                </div>

                <button
                  disabled={isPendingOtp}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white cursor-pointer"
                >
                  {isPendingOtp ? "... تأكيد" : "تأكيد"}
                </button>
              </form>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
