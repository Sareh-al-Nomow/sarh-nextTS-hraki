"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  colors?: string[];
  tags?: string[];
  isNew?: boolean;
  description?: string;
  features?: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "AirMax Pro Shoes - Premium Comfort & Style",
    price: "$89.99",
    originalPrice: "$129.99",
    image: "/image/products/img-4.jpg",
    rating: 4.7,
    colors: ["#111827", "#6B7280", "#F59E0B"],
    tags: ["HOT", "30% OFF"],
    isNew: true,
    description:
      "Experience ultimate comfort with our premium running shoes featuring advanced cushioning technology and breathable materials.",
    features: [
      "Breathable knit upper",
      "Responsive cushioning",
      "Durable rubber outsole",
      "Lightweight design",
    ],
  },
  {
    id: 2,
    name: "Smart Watch Pro - Fitness & Health Tracker",
    price: "$199.99",
    originalPrice: "$249.99",
    image: "/image/products/img-4.jpg",
    rating: 4.8,
    colors: ["#000000", "#1E3163", "#FF0000"],
    tags: ["BESTSELLER", "NEW"],
    isNew: true,
    description:
      "Track your fitness goals with precision using our advanced smartwatch with heart rate monitoring and GPS.",
  },
  {
    id: 3,
    name: "Minimalist Backpack - Urban Edition",
    price: "$59.99",
    image: "/image/products/img-2.jpg",
    rating: 4.5,
    colors: ["#2D4263", "#C84B31"],
    tags: ["ECO-FRIENDLY"],
    description:
      "Sleek and functional backpack made from recycled materials with multiple compartments for urban travelers.",
  },
  {
    id: 4,
    name: "AirMax Pro Shoes - Premium Comfort & Style",
    price: "$89.99",
    originalPrice: "$129.99",
    image: "/image/products/img-3.jpg",
    rating: 4.7,
    colors: ["#111827", "#6B7280", "#F59E0B"],
    tags: ["HOT", "30% OFF"],
    isNew: true,
    description:
      "Experience ultimate comfort with our premium running shoes featuring advanced cushioning technology and breathable materials.",
    features: [
      "Breathable knit upper",
      "Responsive cushioning",
      "Durable rubber outsole",
      "Lightweight design",
    ],
  },
  {
    id: 5,
    name: "Smart Watch Pro - Fitness & Health Tracker",
    price: "$199.99",
    originalPrice: "$249.99",
    image: "/image/products/img-1.jpg",
    rating: 4.8,
    colors: ["#000000", "#1E3163", "#FF0000"],
    tags: ["BESTSELLER", "NEW"],
    isNew: true,
    description:
      "Track your fitness goals with precision using our advanced smartwatch with heart rate monitoring and GPS.",
  },
  {
    id: 6,
    name: "Minimalist Backpack - Urban Edition",
    price: "$59.99",
    image: "/image/products/img-2.jpg",
    rating: 4.5,
    colors: ["#2D4263", "#C84B31"],
    tags: ["ECO-FRIENDLY"],
    description:
      "Sleek and functional backpack made from recycled materials with multiple compartments for urban travelers.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 },
  },
};

export default function ProductsList() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const router = useRouter();

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const handleNavigateToProduct = (id: string) => {
    sessionStorage.setItem("scrollY", window.scrollY.toString());
    router.push(`/ProductDetails/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-6 py-8 bg-gradient-to-r from-blue-50 to-cyan-50"
      >
        <h1 className="text-3xl font-bold text-gray-900">Premium Collection</h1>
        <p className="text-gray-600 mt-2">Curated just for you</p>
      </motion.header>

      {/* Product Grid */}
      <div className="px-4 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-sm overflow-hidden relative group"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  priority={product.id <= 4}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
                  {product.isNew && (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.tags?.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`text-xs px-2 py-1 rounded-full ${
                        tag === "HOT"
                          ? "bg-red-500"
                          : tag === "BESTSELLER"
                          ? "bg-purple-500"
                          : tag === "NEW"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } text-white`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Like Button */}
                <motion.div
                  className="absolute top-3 right-3 flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <FiHeart
                      className={`${
                        likedProducts.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </motion.button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
                  {product.name}
                </h3>

                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                    }}
                  >
                    <FiShoppingCart size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Quick View Trigger */}
              <button
                onClick={() => setQuickViewProduct(product)}
                className="absolute inset-0 z-10"
                aria-label={`Quick view ${product.name}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Close Button */}
              <div className="relative h-48 w-full">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Close Button Inside Image Box */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  aria-label="Close quick view"
                >
                  <FiX size={18} className="text-gray-800" />
                </button>

                {/* Badges */}
                {quickViewProduct.tags && quickViewProduct.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex gap-1">
                    {quickViewProduct.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          tag === "HOT"
                            ? "bg-red-500"
                            : tag === "BESTSELLER"
                            ? "bg-purple-500"
                            : tag === "NEW"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        } text-white`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{quickViewProduct.name}</h2>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <FiStar className="text-yellow-400 mr-1" size={14} />
                    <span className="text-sm">{quickViewProduct.rating}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    {quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600">{quickViewProduct.description}</p>

                {/* Color Options */}
                {quickViewProduct.colors && (
                  <div>
                    <h3 className="font-medium mb-1">Colors:</h3>
                    <div className="flex gap-2">
                      {quickViewProduct.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className="bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2">
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      handleNavigateToProduct(quickViewProduct.name)
                    }
                    className="border border-black py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load More Button */}
      <motion.div
        className="mt-8 sm:mt-12 text-center pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-3 bg-gradient-to-r from-[#219EBC] to-[#2EC4B6] text-white rounded-full font-medium shadow-md hover:shadow-lg transition"
        >
          Load More Products
        </motion.button>
      </motion.div>
    </div>
  );
}
