import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center mt-12 h-full">
      <motion.div
        className="w-12 h-12 border-4 border-[#126782] border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );
};

export default Spinner;
