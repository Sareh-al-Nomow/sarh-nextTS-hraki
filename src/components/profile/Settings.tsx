import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Settings = () => {
  const t = useTranslations("account.settings");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-medium">{t("title")}</h2>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-medium mb-3">{t("email.title")}</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded text-blue-600"
                defaultChecked
              />
              <span>{t("email.orderUpdates")}</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded text-blue-600"
                defaultChecked
              />
              <span>{t("email.promotions")}</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded text-blue-600" />
              <span>{t("email.recommendations")}</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">{t("push.title")}</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded text-blue-600"
                defaultChecked
              />
              <span>{t("push.statusChanges")}</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="rounded text-blue-600" />
              <span>{t("push.newArrivals")}</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="rounded text-blue-600"
                defaultChecked
              />
              <span>{t("push.accountActivity")}</span>
            </label>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
            {t("save")}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
