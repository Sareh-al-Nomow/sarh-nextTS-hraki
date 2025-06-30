"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Key } from "react";

export default function ReturnPolicy() {
  const t = useTranslations("returnPolicy");
  const contactEmail = "returns@sarahalnomow.com";
  const contactPhone = "+962 7 1234 5678"; // Jordan phone number format

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("lastUpdated", { date: new Date().toLocaleDateString() })}
          </p>

          <div className="prose max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.eligibility.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.eligibility.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.initiateReturn.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.initiateReturn.content")}
              </p>
              <p className="text-gray-600 mt-4">
                {t("sections.initiateReturn.note", { email: contactEmail })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.shipping.title")}
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                        {t
                        .raw("sections.shipping.table.headers")
                        .map((header: string, index: number) => (
                          <th
                          key={index}
                          className="py-3 px-4 border-b text-left"
                          >
                          {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t
                      .raw("sections.shipping.table.rows")
                      .map((row: string[], rowIndex: Key | null | undefined) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="py-3 px-4 border-b">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 text-sm">
                {t("sections.shipping.note")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.refundProcess.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.refundProcess.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.exchanges.title")}
              </h2>
              <p className="text-gray-600">{t("sections.exchanges.content")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.damagedItems.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.damagedItems.content", { email: contactEmail })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.international.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.international.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.storeCredit.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.storeCredit.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.contact.title")}
              </h2>
              <p className="text-gray-600 mb-2">
                {t("sections.contact.content")}
              </p>
              <p className="text-gray-600">
                {t("sections.contact.details.email", { email: contactEmail })}
                <br />
                {t("sections.contact.details.phone", { phone: contactPhone })}
                <br />
                {t("sections.contact.details.hours")}
              </p>
              <p className="text-gray-600 mt-4">
                {t.rich("sections.contact.shippingLink", {
                  link: (chunks) => (
                    <Link
                      href="/shipping-policy"
                      className="text-blue-600 hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
