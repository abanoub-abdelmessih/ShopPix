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
import { cn } from "@/lib/utils";

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
      className="bg-gray-600 text-white p-1.5 md:p-2 lg:p-3 rounded-full hover:bg-gray-700 dark:hover:bg-slate-200 dark:bg-white dark:text-black hover:scale-95 transition shadow-xl z-10 border-2 border-slate-200 dark:border-slate-800"
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
  className?: string;
  hasOverlay?: boolean;
  breakpoints?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView = 4,
  spaceBetween = 0,
  className,
  hasOverlay = false,
  breakpoints = true,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const breakPointsObject = {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    780: { slidesPerView: 3 },
    900: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
    1400: { slidesPerView: 6 },
    1600: { slidesPerView, spaceBetween: 20 },
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-3 md:gap-8 px-5 lg:px-12 py-8 relative",
        className
      )}
    >
      {hasOverlay && (
        <div className="absolute inset-0 z-0 bg-black/50 dark:bg-black/60 pointer-events-none" />
      )}

      <CarouselButton swiperRef={swiperRef} position="left" />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={breakpoints ? undefined : 1}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        loop={true}
        breakpoints={breakpoints ? breakPointsObject : undefined}
        className="cursor-grab h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {children}
      </Swiper>

      <CarouselButton swiperRef={swiperRef} position="right" />
    </div>
  );
};
