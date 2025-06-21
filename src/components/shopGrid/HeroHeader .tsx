import { motion } from "framer-motion";

interface HeroHeaderProps {
  title: string;
  description: string;
}

const HeroHeader = ({ title, description }: HeroHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#219EBC] to-[#023047] text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">{description}</p>
      </div>
    </motion.div>
  );
};

export default HeroHeader;
