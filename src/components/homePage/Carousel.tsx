"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Collection } from "@/lib/models/collectionModal";
import { useRouter } from "next/navigation";

interface CarouselProps {
  collections: Collection[];
}

const Carousel: React.FC<CarouselProps> = ({ collections }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Fallback images if collections is empty
  const imagesToDisplay =
    collections?.length > 0
      ? collections
      : [
          {
            collection_id: "1",
            image: "/image/carousel/carousel-1.png",
            name: "Default Banner 1",
          },
          {
            collection_id: "2",
            image: "/image/carousel/carousel-2.png",
            name: "Default Banner 2",
          },
        ];

  // Navigation functions
  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateSlide(-1);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateSlide(1);
  };

  const navigateSlide = (direction: number) => {
    resetTimer();
    setIsFlashing(true);
    setActiveIndex(
      (prev) =>
        (prev + direction + imagesToDisplay.length) % imagesToDisplay.length
    );
    setTimeout(() => setIsFlashing(false), 300);
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    resetTimer();
    setIsFlashing(true);
    setActiveIndex(index);
    setTimeout(() => setIsFlashing(false), 300);
  };

  // Timer management
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const startTimer = React.useCallback(() => {
    timerRef.current = setInterval(() => {
      setIsFlashing(true);
      setActiveIndex((prev) => (prev + 1) % imagesToDisplay.length);
      setTimeout(() => setIsFlashing(false), 300);
    }, 4000);
  }, [imagesToDisplay.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleImageClick = () => {
    const currentCollection = imagesToDisplay[activeIndex];
    if (currentCollection?.collection_id) {
      router.push(`/shopGrid?collectionId=${currentCollection.collection_id}`);
    } else {
      router.push(`/shopGrid`);
    }
  };

  if (collections.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No Banner available</p>
      </div>
    );
  }

  return (
    <div className="mt-5 mx-3 lg:mx-10">
      <div className="container m-auto w-full rounded relative">
        {/* Carousel wrapper - clickable area for the image */}
        <div
          className={`relative h-[130.47px] sm:h-[140px] md:h-[190px] lg:h-[270px] xl:h-[310px] 2xl:h-[320px] overflow-hidden rounded-2xl transition-all duration-300 ${
            isFlashing ? "bg-white" : ""
          }`}
          onClick={handleImageClick}
        >
          {/* Slides */}
          {imagesToDisplay.map((collection, idx) => (
            <div
              key={collection.collection_id || idx}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={collection.image}
                  alt={collection.name || `Banner ${idx + 1}`}
                  className="object-cover"
                  fill
                  priority={idx === 0}
                  onError={(e) => {
                    console.error("Failed to load image:", collection.image);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          ))}

          {/* Indicators - positioned above but with click propagation stopped */}
          {imagesToDisplay.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-30">
              <div className="flex justify-center gap-2">
                {imagesToDisplay.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === activeIndex
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={(e) => goToSlide(idx, e)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Navigation arrows - positioned above but with click propagation stopped */}
          {imagesToDisplay.length > 1 && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex justify-between items-center pointer-events-none">
              <button
                type="button"
                className="h-full px-4 flex items-center justify-center cursor-pointer group pointer-events-auto"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 transition-all">
                  <svg
                    className="w-4 h-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="h-full px-4 flex items-center justify-center cursor-pointer group pointer-events-auto"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 transition-all">
                  <svg
                    className="w-4 h-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
