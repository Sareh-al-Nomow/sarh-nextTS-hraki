"use client";

import { useTranslations } from "next-intl";

export default function TermsOfService() {
  const t = useTranslations("termsOfService");
  const contactEmail = "legal@example.com";
  const contactAddress = "123 Legal Street, Compliance City";

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
                {t("sections.acceptance.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.acceptance.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.description.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.description.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.responsibilities.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.responsibilities.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.purchases.title")}
              </h2>
              <p className="text-gray-600">{t("sections.purchases.content")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.intellectualProperty.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.intellectualProperty.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.userContent.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.userContent.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.prohibitedActivities.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.prohibitedActivities.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.termination.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.termination.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.liability.title")}
              </h2>
              <p className="text-gray-600">{t("sections.liability.content")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.governingLaw.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.governingLaw.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.changes.title")}
              </h2>
              <p className="text-gray-600">{t("sections.changes.content")}</p>
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
                {t("sections.contact.details.address", {
                  address: contactAddress,
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
