import { motion } from "framer-motion";

const MyProducts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-6">
        <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 04/2025</p>
            </div>
          </div>
          <button className="text-sm text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-bold">MC</span>
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 5555</p>
              <p className="text-sm text-gray-500">Expires 08/2024</p>
            </div>
          </div>
          <button className="text-sm text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProducts;
