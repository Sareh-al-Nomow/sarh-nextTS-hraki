"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("privacyPolicy");
  const contactEmail = "privacy@example.com";
  const contactAddress = "123 Privacy Lane, Data City";

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
                {t("sections.introduction.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.introduction.content", { email: contactEmail })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.informationCollection.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.informationCollection.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.informationUse.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.informationUse.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.informationSharing.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.informationSharing.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.cookies.title")}
              </h2>
              <p className="text-gray-600">{t("sections.cookies.content")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.dataSecurity.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.dataSecurity.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.privacyRights.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.privacyRights.content", { email: contactEmail })}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.childrenPrivacy.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.childrenPrivacy.content")}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("sections.policyChanges.title")}
              </h2>
              <p className="text-gray-600">
                {t("sections.policyChanges.content")}
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
