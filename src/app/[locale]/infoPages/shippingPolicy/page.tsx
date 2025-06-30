"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ShippingPolicy() {
  const t = useTranslations("shippingPolicy");
  const contactEmail = "shipping@example.com";
  const contactPhone = "+123 456 7890";

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
                {t("sections.processingTime.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.processingTime.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.domesticShipping.title")}
              </h2>
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                        {(t
                        .raw("sections.domesticShipping.table.headers") as string[])
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
                    {(t
                      .raw("sections.domesticShipping.table.rows") as string[][])
                      .map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => (
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
                {t("sections.domesticShipping.note")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.internationalShipping.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.internationalShipping.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.orderTracking.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.orderTracking.content", { email: contactEmail })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.shippingRestrictions.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.shippingRestrictions.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.delayedOrders.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.delayedOrders.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.incorrectAddress.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.incorrectAddress.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.lostPackages.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.lostPackages.content", { days: 14 })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.returnsExchanges.title")}
              </h2>
              <p className="text-gray-600">
                {t.rich("sections.returnsExchanges.content", {
                  link: (chunks) => (
                    <Link
                      href="/return-policy"
                      className="text-blue-600 hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
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
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
