import { motion } from "framer-motion";
import React from "react";
import { ProductReview } from "@/lib/models/reviewModal";
import StarRating from "../shared/StarRating";

const ReviewsSection: React.FC<{ productReviews: ProductReview[] }> = ({
  productReviews,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View all reviews
        </motion.button> */}
      </div>

      <div className="space-y-6">
        {productReviews.map((review) => (
          <motion.div
            key={review.review_id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-medium">{review.customer.full_name}</h3>
                <div className="flex text-yellow-400 mt-1">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{review.review_text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ReviewsSection;
