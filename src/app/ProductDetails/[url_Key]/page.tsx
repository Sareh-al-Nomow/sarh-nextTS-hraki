"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiStar,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  features: string[];
  images: string[];
}

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample product data
  const product: Product = {
    id: "prod-001",
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions.",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 128,
    colors: ["#3b82f6", "#ef4444", "#10b981", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design",
    ],
    images: [
      "/image/products/img-1.jpg",
      "/image/products/img-2.jpg",
      "/image/products/img-3.jpg",
      "/image/products/img-4.jpg",
    ],
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Link href={"/"}>
            <FiChevronLeft className="text-xl text-gray-600" />
          </Link>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl  font-semibold text-gray-800 -translate-x-1/2"
        >
          Product Details
        </motion.h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow-sm p-4 overflow-hidden"
            >
              <div className="relative h-96 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={product.images[currentImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFavorite}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiHeart className="text-xl" />
                </motion.button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h2
                  whileHover={{ x: 2 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {product.name}
                </motion.h2>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.floor(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <motion.p
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="text-gray-600 mb-6 p-2 rounded-lg"
              >
                {product.description}
              </motion.p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Colors
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === index
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Size
                </h3>
                <div className="flex gap-3">
                  {product.sizes.map((size, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(index)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedSize === index
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center text-gray-600"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  {product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-sm mr-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-800">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-green-600 text-sm ml-2">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-gray-600"
                  >
                    -
                  </motion.button>
                  <span className="px-4 py-2 border-x border-gray-300 font-medium">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-gray-600"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg"
                >
                  <FiShare2 />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Customer Reviews
          </h2>

          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <motion.div
                key={review}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * review }}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">John Doe</h3>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < 5 ? "fill-current" : ""} />
                  ))}
                </div>
                <p className="text-gray-600">
                  These headphones are amazing! The sound quality is exceptional
                  and the noise cancellation works perfectly. Very comfortable
                  for long listening sessions.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
