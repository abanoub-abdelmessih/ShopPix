"use client";

import { useRef } from "react";
import { Swiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselButtonsProps {
  swiperRef: React.RefObject<SwiperType | null>;
  position: "right" | "left";
}

// Navigation Button Component
const CarouselButton: React.FC<CarouselButtonsProps> = ({
  swiperRef,
  position,
}) => {
  const handleClick = () => {
    if (!swiperRef.current) return;
    if (position === "right") {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-600 text-white p-1.5 md:p-2 lg:p-3 rounded-full hover:bg-gray-700 dark:bg-white dark:text-black hover:scale-95 transition shadow-xl"
      aria-label={position === "right" ? "Next slide" : "Previous slide"}
    >
      {position === "right" ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
    </button>
  );
};

interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 4,
  spaceBetween = 0,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full flex items-center justify-between gap-14 px-5 lg:px-12 py-8">
      {/* Left Button */}
      <CarouselButton swiperRef={swiperRef} position="left" />

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          780: { slidesPerView: 3 },
          900: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
          1400: { slidesPerView: 6 },
          1600: { slidesPerView: slidesPerView, spaceBetween: 20 },
        }}
        className="cursor-grab"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {children}
      </Swiper>

      {/* Right Button */}
      <CarouselButton swiperRef={swiperRef} position="right" />
    </div>
  );
};
