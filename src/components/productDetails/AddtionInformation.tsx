import React from "react";
import { motion } from "framer-motion";

interface Attribute {
  attribute: {
    attribute_name: string;
  };
  option: {
    option_text: string;
  };
}

interface Product {
  data: {
    attributes: Attribute[];
    brand?: {
      name: string;
    };
    inventory?: {
      manage_stock: boolean;
    };
    category?: {
      name: string;
    };
  }[];
}

// Mock product data
const mockProduct: Product = {
  data: [
    {
      attributes: [
        {
          attribute: { attribute_name: "Color" },
          option: { option_text: "Black" },
        },
        {
          attribute: { attribute_name: "Size" },
          option: { option_text: "Medium" },
        },
        {
          attribute: { attribute_name: "Material" },
          option: { option_text: "Cotton" },
        },
      ],
      brand: {
        name: "Premium Brands",
      },
      inventory: {
        manage_stock: true,
      },
      category: {
        name: "Clothing",
      },
    },
  ],
};

const AdditionalInformation = () => {
  const product = mockProduct.data[0];

  return (
    <div className="pt-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:hidden text-xl font-bold mb-4"
        id="additionalInformation"
      >
        {`product Additional Information`}
      </motion.div>
      <div id="additionalInformation">
        <div className="product-description">
          <div className="flex flex-wrap">
            <div className="w-full mb-4 md:mb-0">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 align-middle">
                  <tbody>
                    {product.attributes.map((attr, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <th className="border border-gray-200 px-4 py-2 text-left font-medium bg-gray-50">
                          {attr.attribute.attribute_name}
                        </th>
                        <td className="border border-gray-200 px-4 py-2">
                          {attr.option.option_text}
                        </td>
                      </motion.tr>
                    ))}
                    {product.brand && (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: product.attributes.length * 0.1 }}
                      >
                        <th className="border border-gray-200 px-4 py-2 text-left font-medium bg-gray-50">
                          {`Brands`}
                        </th>
                        <td className="border border-gray-200 px-4 py-2">
                          {product.brand.name}
                        </td>
                      </motion.tr>
                    )}
                    {product.inventory !== undefined && (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: (product.attributes.length + 1) * 0.1,
                        }}
                      >
                        <th className="border border-gray-200 px-4 py-2 text-left font-medium bg-gray-50">
                          {`Availability`}
                        </th>
                        <td className="border border-gray-200 px-4 py-2">
                          {product.inventory?.manage_stock
                            ? "In Stock"
                            : "Out of Stock"}
                        </td>
                      </motion.tr>
                    )}
                    {product.category && product.category.name && (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: (product.attributes.length + 2) * 0.1,
                        }}
                      >
                        <th className="border border-gray-200 px-4 py-2 text-left font-medium bg-gray-50">
                          {`Category`}
                        </th>
                        <td className="border border-gray-200 px-4 py-2">
                          {product.category.name}
                        </td>
                      </motion.tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
