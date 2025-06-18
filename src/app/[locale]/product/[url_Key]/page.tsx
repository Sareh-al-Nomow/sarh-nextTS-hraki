"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronLeft,
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
import ReviewsSection from "@/components/productDetails/ReviewsSection";
import StarRating from "@/components/shared/StarRating";
import { getReviewsForProductById } from "@/lib/axios/reviewAxiox";

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
  console.log(data);
  // eazar one
  const {
    data: productReviews,
    isLoading: isLoadingReviews,
    error: errorReviews,
  } = useQuery({
    queryKey: ["product-reviews", product?.id],
    queryFn: ({ signal }) =>
      product
        ? getReviewsForProductById(product.id, signal)
        : Promise.resolve([]),
    enabled: !!product?.id,
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
      <div className="my-40">
        <Spinner />
      </div>
    );
  }

  if (error || errorReviews) {
    return (
      <div className="text-center py-10">
        <h1 className="text-red-500"> {error?.name || errorReviews?.name}</h1>
        <p className="text-red-200">
          {" "}
          {error?.message || errorReviews?.message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // const totalRate =
  //   productReviews?.reduce((acc, re) => acc + re.rating, 0) || 0;

  // const averageRate =
  //   productReviews && productReviews.length > 0
  //     ? totalRate / productReviews.length
  //     : 0;

  console.log(product);
  console.log(product?.images);

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
                        product?.images?.[currentImage]?.origin_image ??
                        "https://sarehnomow.fsn1.your-objectstorage.com/images/2d4aec3a-850a-471b-a61e-194053ec7331.png"
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
                    <div key={index}>
                      {image.origin_image && image.origin_image !== "" && (
                        <motion.button
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
                            src={image.origin_image}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      )}
                    </div>
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
                  <StarRating rating={product?.meanRating ?? 0} />
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
        {isLoadingReviews ? (
          <Spinner />
        ) : (
          <ReviewsSection productReviews={productReviews ?? []} />
        )}
      </main>
    </div>
  );
}
