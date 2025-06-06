"use client";

import { useState } from "react";
import Modal from "../UI/Modal";
import { FcGoogle } from "react-icons/fc";
import { GoSignIn } from "react-icons/go";

export default function RegistrationLink() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  return (
    <>
      <GoSignIn
        className="pr-text text-2xl cursor-pointer"
        onClick={() => {
          setIsOpenModal(true);
          setIsCreatingAccount(false); // افتح على شاشة تسجيل الدخول افتراضياً
        }}
      />

      <Modal open={isOpenModal}>
        <div className="pr-bg text-white rounded-2xl  w-full max-w-md p-6">
          {!isCreatingAccount ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">
                تسجيل الدخول
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">كلمة المرور</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white"
                >
                  تسجيل الدخول
                </button>
              </form>

              <div className="text-center my-4 text-sm">
                ليس لديك حساب؟{" "}
                <button
                  onClick={() => setIsCreatingAccount(true)}
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
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">
                إنشاء حساب جديد
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">الاسم الكامل</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="الاسم الكامل"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">كلمة المرور</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded text-white"
                >
                  إنشاء حساب
                </button>
              </form>

              <div className="text-center my-4 text-sm">
                لديك حساب؟{" "}
                <button
                  onClick={() => setIsCreatingAccount(false)}
                  className="text-green-400 hover:underline"
                >
                  تسجيل الدخول
                </button>
              </div>

              <div className="text-center">
                <button className="flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 w-full py-2 rounded">
                  <FcGoogle className="text-xl" />
                  <span>التسجيل عبر Google</span>
                </button>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsOpenModal(false)}
              className="text-sm text-gray-400 hover:text-white"
            >
              إغلاق
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
