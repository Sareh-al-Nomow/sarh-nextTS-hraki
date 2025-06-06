"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Carousel = () => {
  const images = [
    "/image/carousel/carousel-1.png",
    "/image/carousel/carousel-2.png",
    "/image/carousel/carousel-3.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    resetTimer();
    setIsFlashing(true);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsFlashing(false), 300);
  };

  const nextSlide = () => {
    resetTimer();
    setIsFlashing(true);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsFlashing(false), 300);
  };

  const goToSlide = (index: number) => {
    resetTimer();
    setIsFlashing(true);
    setActiveIndex(index);
    setTimeout(() => setIsFlashing(false), 300);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startTimer();
  };

  const startTimer = React.useCallback(() => {
    timerRef.current = setInterval(() => {
      setIsFlashing(true);
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsFlashing(false), 300);
    }, 4000);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  return (
    <div className="mt-5 mx-3 lg:mx-10">
      <div className="container m-auto w-full rounded-4xl relative">
        {" "}
        {/* Still relative for Image */}
        {/* Carousel wrapper */}
        <div
          className={`relative h-[100.47px] sm:h-[140px] md:h-[190px] lg:h-[270px] xl:h-[320px] 2xl:h-[360px]
 overflow-hidden rounded-4xl transition-all duration-300 ${
   isFlashing ? "bg-white" : ""
 }`}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`duration-700 ease-in-out w-full h-full ${
                idx === activeIndex ? "block" : "hidden"
              }`}
              aria-hidden={idx !== activeIndex}
            >
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full object-cover"
                sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
                fill
                priority
              />
            </div>
          ))}
        </div>
        {/* Slider indicators - now using translate */}
        <div className="flex justify-center absolute bottom-2 left-0 right-0">
          <div className="flex gap-2 transform translate-x-0">
            {" "}
            {/* Center with flex parent */}
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  idx === activeIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(idx)}
              ></button>
            ))}
          </div>
        </div>
        {/* Slider controls - using translate */}
        <div className="flex justify-between w-full h-full absolute top-0 left-0">
          <button
            type="button"
            className="flex items-center justify-center h-full px-4 cursor-pointer group transform translate-x-0"
            onClick={prevSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path stroke="currentColor" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center h-full px-4 cursor-pointer group transform translate-x-0"
            onClick={nextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path stroke="currentColor" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
