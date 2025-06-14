"use client";

import { FaStar, FaRegStar } from "react-icons/fa";
import React from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: {
    setHoveredStar: (star: number | null) => void;
    handleStarClick: (star: number) => void;
  };
  interactive?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  interactive = true,
  size = 20,
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;
        const StarIcon = isActive ? FaStar : FaRegStar;

        return (
          <StarIcon
            key={star}
            size={size}
            className={`mr-1 transition-colors ${
              interactive ? "cursor-pointer" : "cursor-default"
            } ${isActive ? "text-yellow-400" : "text-gray-300"}`}
            // onMouseEnter={
            //   interactive
            //     ? () => onRatingChange?.setHoveredStar(star)
            //     : undefined
            // }
            // onMouseLeave={
            //   interactive
            //     ? () => onRatingChange?.setHoveredStar(null)
            //     : undefined
            // }
            onClick={
              interactive
                ? () => onRatingChange?.handleStarClick(star)
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default StarRating;
