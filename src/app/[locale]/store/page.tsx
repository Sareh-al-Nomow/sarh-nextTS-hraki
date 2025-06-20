"use client";

import StarRating from "@/components/shared/StarRating";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  FiArrowRight,
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

const VendorPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Vendor data
  const vendor = {
    id: 12,
    name: "Urban Style Collective",
    logo: "/image/categories/jewellery.jpg",
    banner: "/image/carousel/carousel-4.jpg",
    rating: 4.9,
    reviews: 2847,
    joinedDate: "March 2018",
    description:
      "Curated urban fashion for the modern lifestyle. Where streetwear meets sophistication.",
    categories: ["Streetwear", "Footwear", "Accessories", "Denim"],
    stats: {
      products: 142,
      customers: "58K+",
      responseRate: "98%",
      shippingTime: "1-2 days",
    },
  };

  const products = [
    {
      id: 1,
      name: "Graphic Tee",
      price: 29.99,
      image: "/products/tee.jpg",
      rating: 4.8,
      isNew: true,
      colors: ["#000000", "#3B82F6", "#EF4444"],
    },
    {
      id: 2,
      name: "Cargo Pants",
      price: 59.99,
      image: "/products/pants.jpg",
      rating: 4.9,
      isTrending: true,
      colors: ["#1F2937", "#78350F"],
    },
    {
      id: 3,
      name: "Dad Hat",
      price: 24.99,
      image: "/products/hat.jpg",
      rating: 4.7,
      colors: ["#111827", "#374151", "#6B7280"],
    },
    {
      id: 4,
      name: "Canvas Sneakers",
      price: 79.99,
      image: "/products/sneakers.jpg",
      rating: 4.6,
      isNew: true,
      colors: ["#F59E0B", "#10B981", "#3B82F6"],
    },
  ];

  return (
    <div className="bg-gray-50" ref={containerRef}>
      {/* Hero Banner with Parallax */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={vendor.banner}
            alt="Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Vendor Info */}
        <div className="relative -mt-8 z-10 flex h-full items-end pb-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-2xl"
              >
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center md:text-left"
              >
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                  <h1 className="text-4xl font-bold text-white sm:text-5xl">
                    {vendor.name}
                  </h1>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <StarRating rating={vendor.rating} />
                    <span className="font-medium text-white">
                      {vendor.rating}
                    </span>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-lg text-gray-200">
                  {vendor.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-12 mb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6 rounded-2xl bg-white p-8 shadow-xl sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">
                {vendor.stats.products}
              </p>
              <p className="text-gray-500">Products</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">99</p>
              <p className="text-gray-500">Success Orders</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">Founded</p>
              <p className="text-gray-500">2010/8/9 - jordan - Amman</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">Jordan</p>
              <p className="text-gray-500">Amman</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto my-20 px-6 ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="mt-2 text-gray-600">
                Discover {vendor.name}s curated collection
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 md:mt-0"
            >
              View all products <FiArrowRight />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Product Labels */}
              {product.isNew && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  NEW
                </div>
              )}
              {product.isTrending && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-pink-600 px-3 py-1 text-xs font-bold text-white">
                  TRENDING
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100">
                  <FiHeart />
                </button>
                <button className="rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100">
                  <FiShare2 />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-500">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>

                {/* Color Options */}
                <div className="mt-3 flex gap-2">
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ backgroundColor: "#1d4ed8" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white"
                >
                  <FiShoppingCart /> Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorPage;
