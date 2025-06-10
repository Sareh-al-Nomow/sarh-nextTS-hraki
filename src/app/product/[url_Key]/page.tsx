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
                        product?.image ??
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
                        src={
                          typeof image === "string"
                            ? image
                            : typeof image === "object" && image.single_image
                            ? image.single_image
                            : "/placeholder.png"
                        }
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
