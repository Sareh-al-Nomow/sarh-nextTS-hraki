"use client";

import { motion } from "framer-motion";
import { getAttributeGroupById } from "@/lib/axios/AttributesAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import type { Attributes } from "@/models/forntEndProduct";
import { getVariantGroupById } from "@/lib/axios/variantAxios";
import {
  extractAttributesFromVariantGroup,
  extractCoupledVariants,
} from "@/utils/flattenedAttribute";
import { useRouter } from "next/navigation";

type AttributesProps = {
  group_id: number;
  variant_group_id: number;
  defaultAttributes: Attributes[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const optionVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
    transition: { duration: 0.1 },
  },
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 700,
      damping: 20,
    },
  },
};

const Attributes = ({
  group_id,
  defaultAttributes,
  variant_group_id,
}: AttributesProps) => {
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["attribute-group", group_id],
    queryFn: () => getAttributeGroupById(group_id),
    enabled: !!group_id,
  });

  const {
    data: dataVariant,
    isLoading: isLoadingVariant,
    error: errorVariant,
  } = useQuery({
    queryKey: ["variant-group", variant_group_id],
    queryFn: () => getVariantGroupById(variant_group_id),
    enabled: !!variant_group_id,
  });

  const coupledVariants = dataVariant
    ? extractCoupledVariants(dataVariant)
    : [];

  const variantsOptions = dataVariant
    ? extractAttributesFromVariantGroup(dataVariant)
    : [];

  useEffect(() => {
    const initial: Record<number, string> = {};
    defaultAttributes.forEach((att) => {
      initial[att.attribute_id] = att.option_text;
    });
    setSelectedOptions(initial);
  }, [defaultAttributes]);

  const isAvailableOption = (optionId: number): boolean => {
    return coupledVariants.some((variant) =>
      variant.options.some((opt) => opt.option_id === optionId)
    );
  };

  const isGloableAvailable = (attributeId: number, optionId: number) => {
    // 1. تحديث الخيار المحدد
    const newSelectedOptions = {
      ...selectedOptions,
      [attributeId]:
        variantsOptions.find((opt) => opt.option_id === optionId)
          ?.option_text || "",
    };

    // 2. البحث عن المتغير الذي يتطابق مع جميع الخيارات المحددة
    const matchedVariant = coupledVariants.find((variant) =>
      variant.options.every(
        (opt) => newSelectedOptions[opt.attribute_id] === opt.option_text
      )
    );

    if (matchedVariant?.url_key) {
      return true;
    } else {
      return false;
    }
  };

  const handleOptionSelect = (attributeId: number, optionId: number) => {
    const matchedVariant = coupledVariants.find((variant) =>
      variant.options.some((opt) => opt.option_id === optionId)
    );

    if (!matchedVariant) return;

    const updated: Record<number, string> = {};
    matchedVariant.options.forEach((opt) => {
      updated[opt.attribute_id] = opt.option_text;
    });
    setSelectedOptions(updated);

    if (matchedVariant.url_key) {
      localStorage.setItem("product", window.scrollY.toString());
      router.push(`/product/${matchedVariant.url_key}`);
    }
  };

  console.log(dataVariant);
  console.log(variantsOptions);
  console.log(coupledVariants);
  console.log(selectedOptions);

  if (isLoading || isLoadingVariant) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex space-x-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
                backgroundColor: ["#e5e7eb", "#3b82f6", "#e5e7eb"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="w-3 h-3 rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error instanceof Error || errorVariant instanceof Error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
      >
        <p className="text-red-700 font-medium">
          Error loading attributes:{" "}
          {error?.message || errorVariant?.message || "Unknown error"}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="space-y-6"
      >
        {data?.links.map((link) => (
          <motion.div
            key={link.attribute_group_link_id}
            variants={itemVariants}
            className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {link.attribute.attribute_name}
              </h3>
              {selectedOptions[link.attribute.attribute_id] && (
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full self-start sm:self-auto">
                  Selected: {selectedOptions[link.attribute.attribute_id]}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {link.attribute.options.map((option) => {
                const isSelected =
                  selectedOptions[link.attribute.attribute_id] ===
                  option.option_text;
                const isColorOption = link.attribute.attribute_code
                  .toLowerCase()
                  .includes("color");
                const isAvailable = isAvailableOption(
                  option.attribute_option_id
                );
                const isGloableAva = isGloableAvailable(
                  option.attribute_id,
                  option.attribute_option_id
                );

                return (
                  <motion.div
                    key={option.attribute_option_id}
                    variants={optionVariants}
                    initial="rest"
                    whileHover={isAvailable ? "hover" : "rest"}
                    whileTap={isAvailable ? "tap" : "rest"}
                    className="relative"
                  >
                    <button
                      disabled={!isAvailable}
                      onClick={() =>
                        handleOptionSelect(
                          option.attribute_id,
                          option.attribute_option_id
                        )
                      }
                      className={`
                        w-full h-12 rounded-md flex items-center justify-center transition-all
                        ${
                          isSelected
                            ? "border-2 border-blue-500 bg-blue-50/50 font-medium text-blue-600"
                            : "border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                        }
                        ${isColorOption ? "p-0 overflow-hidden" : "px-3 py-2"}
                        ${
                          !isAvailable
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-45 relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-[1px] after:bg-gray-400 after:transform after:rotate-[-15deg] after:origin-center"
                            : "opacity-100 cursor-pointer hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                        }
                         ${
                           !isGloableAva
                             ? " bg-gray-100 border-gray-200 text-gray-400 opacity-45 relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-[1px] after:bg-gray-400 after:transform after:rotate-[-15deg] after:origin-center"
                             : "opacity-100 cursor-pointer hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                         }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      `}
                    >
                      {isColorOption ? (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: option.option_text }}
                          title={option.option_text}
                        />
                      ) : (
                        <span className="truncate text-sm">
                          {option.option_text}
                        </span>
                      )}

                      {!isAvailable && (
                        <div className="absolute top-0 right-0 bg-gray-400 text-white text-[10px] font-bold px-1 rounded-bl-md">
                          غير متوفر
                        </div>
                      )}

                      {!isGloableAva && (
                        <div className="absolute top-0 right-0 bg-gray-400 text-white text-[10px] font-bold px-1 rounded-bl-md"></div>
                      )}

                      {isSelected && !isColorOption && (
                        <motion.span
                          variants={checkVariants}
                          initial="hidden"
                          animate="visible"
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-xs"
                        >
                          <FiCheck className="h-3 w-3 text-blue-500" />
                        </motion.span>
                      )}

                      {isSelected && isColorOption && (
                        <motion.span
                          variants={checkVariants}
                          initial="hidden"
                          animate="visible"
                          className="absolute inset-0 flex items-center justify-center bg-black/20"
                        >
                          <FiCheck className="h-4 w-4 text-white" />
                        </motion.span>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Attributes;
