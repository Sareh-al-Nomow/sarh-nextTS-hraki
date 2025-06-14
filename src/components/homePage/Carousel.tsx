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
  const prevSlide = () => navigateSlide(-1);
  const nextSlide = () => navigateSlide(1);

  const navigateSlide = (direction: number) => {
    resetTimer();
    setIsFlashing(true);
    setActiveIndex(
      (prev) =>
        (prev + direction + imagesToDisplay.length) % imagesToDisplay.length
    );
    setTimeout(() => setIsFlashing(false), 300);
  };

  const goToSlide = (index: number) => {
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

  function handleShowShopGrid() {
    console.log("تم النقر على الصورة");
    router.push(`/shopGrid`);
  }

  return (
    <div className="mt-5 mx-3 lg:mx-10">
      <div className="container m-auto w-full rounded-4xl relative">
        {/* Carousel wrapper */}
        <div
          className={`relative h-[100.47px] sm:h-[140px] md:h-[190px] lg:h-[270px] xl:h-[320px] 2xl:h-[360px] overflow-hidden rounded-4xl transition-all duration-300 ${
            isFlashing ? "bg-white" : ""
          }`}
        >
          {imagesToDisplay.map((collection, idx) => (
            <div
              key={collection.collection_id || idx}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                idx === activeIndex
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div
                className="cursor-pointer w-full h-full relative"
                onClick={handleShowShopGrid}
              >
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

          {/* Indicators */}
          {imagesToDisplay.length > 1 && (
            <>
              <div className="flex justify-center absolute bottom-2 left-0 right-0 z-20">
                <div className="flex gap-2">
                  {imagesToDisplay.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`w-3 h-3 rounded-full ${
                        idx === activeIndex ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex justify-between w-full h-full absolute top-0 left-0 z-20">
                <button
                  type="button"
                  className="flex items-center justify-center h-full px-4 cursor-pointer group"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
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
                <div
                  onClick={() =>
                    router.push(
                      `/shopGrid?collections=${collections[activeIndex].collection_id}`
                    )
                  }
                  className=" cursor-pointer bg-transparent flex-1"
                ></div>
                <button
                  type="button"
                  className="flex items-center justify-center h-full px-4 cursor-pointer group"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
