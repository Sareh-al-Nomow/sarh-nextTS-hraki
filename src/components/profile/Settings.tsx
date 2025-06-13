import { motion } from "framer-motion";

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-medium">Notification Preferences</h2>
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
              <input type="checkbox" className="rounded text-blue-600" />
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
              <input type="checkbox" className="rounded text-blue-600" />
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
  );
};

export default Settings;
