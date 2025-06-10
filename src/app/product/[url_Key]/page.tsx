"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiStar,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import AdditionalInformation from "@/components/productDetails/AddtionInformation";
import { useQuery } from "@tanstack/react-query";
import { getProductByUrlKey } from "@/lib/axios/getProductsAxios";
import { transformProduct } from "@/utils/trnsformProduct";
import { FrontendProduct } from "@/models/forntEndProduct";
import Spinner from "@/components/UI/SpinnerLoading";

type ProductDetailsProps = {
  params: Promise<{ url_Key: string }>;
};

export default function ProductDetails({ params }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<FrontendProduct | null>();
  // const [selectedColor, setSelectedColor] = useState(0);
  // const [selectedSize, setSelectedSize] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const { url_Key } = use(params);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["product", url_Key],
    queryFn: ({ signal }) => getProductByUrlKey(url_Key, signal),
    enabled: !!url_Key,
  });

  useEffect(() => {
    if (data) {
      console.log(data.data);
      const formatedProduct = data?.data?.map(transformProduct);
      setProduct(formatedProduct[0]);
    }
  }, [data]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const discountPercentage =
    product &&
    typeof product.price === "number" &&
    typeof product.originalPrice === "number"
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const nextImage = () => {
    setCurrentImage((prev) =>
      product && product.images && product.images.length > 0
        ? prev === product.images.length - 1
          ? 0
          : prev + 1
        : prev
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      product && product.images && product.images.length > 0
        ? prev === 0
          ? product.images.length - 1
          : prev - 1
        : prev
    );
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h1 className="text-red-500"> {error.name}</h1>
        <p className="text-red-200"> {error.message}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

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
          className="text-xl font-semibold text-gray-800"
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
              className="bg-white rounded-xl shadow-sm p-4 overflow-hidden relative"
            >
              <div
                className="relative h-96 bg-gray-100 rounded-lg mb-4 overflow-hidden cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      scale: isZoomed ? 1.5 : 1,
                      cursor: isZoomed ? "zoom-out" : "zoom-in",
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={
                        (product?.images && product.images[currentImage].single_image) ??
                        "data:image/jpeg;base64,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"
                      }
                      alt={product?.name ?? "Product image"}
                      width={600}
                      height={600}
                      className="object-contain w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  >
                    <FiChevronLeft className="text-xl text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  >
                    <FiChevronRight className="text-xl text-gray-700" />
                  </motion.button>
                </div>

                {/* Favorite button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiHeart className="text-xl" />
                </motion.button>

                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md"
                  >
                    {discountPercentage}% OFF
                  </motion.div>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product &&
                  product.images &&
                  product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image.single_image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
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
                  {product?.name}
                </motion.h2>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.floor(product?.rating ?? 0)
                          ? "fill-current"
                          : "text-yellow-200"
                      }`}
                    />
                  ))}
                </div>
                {/* <span className="text-gray-500 text-sm">
                  {product?.rating?.toFixed(1)} ({product?.reviews?.length ?? 0} reviews)
                </span> */}
              </div>

              <motion.p
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="text-gray-600 mb-6 p-3 rounded-lg bg-gray-50"
              >
                {product?.description}
              </motion.p>

              {/* Color Selection */}
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Color:{" "}
                  <span className="font-normal">
                    {product.colors[selectedColor].name}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        selectedColor === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                      title={color.name}
                    >
                      {selectedColor === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div> */}

              {/* Size Selection */}
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(index)}
                      className={`px-4 py-2 rounded-md border transition-all ${
                        selectedSize === index
                          ? "border-blue-500 bg-blue-50 text-blue-600 font-medium"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div> */}

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product &&
                    Array.isArray(product.features) &&
                    product.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start text-gray-600"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                </ul>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {product ? `$${product.price.toFixed(2)}` : "--"}
                  </span>
                  {product &&
                    typeof product.originalPrice === "number" &&
                    typeof product.price === "number" &&
                    product.originalPrice > product.price && (
                      <>
                        <span className="text-gray-500 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                        <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                          Save $
                          {(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      </>
                    )}
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
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
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FiShoppingCart />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Share product"
                >
                  <FiShare2 />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* addition infromation */}
        <AdditionalInformation />

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Customer Reviews
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all reviews
            </motion.button>
          </div>

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
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={i < 5 ? "fill-current" : ""}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">2 days ago</span>
                </div>
                <p className="text-gray-600 mt-2">
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
