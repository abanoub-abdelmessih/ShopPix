"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperCarouselProps {
  children: React.ReactNode[];
  interval?: number;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  spaceBetween?: number;
}

export const SwiperCarousel = ({
  children,
  interval = 3000,
  loop = false,
  navigation = false,
  pagination = false,
  autoplay = false,
  spaceBetween = 50,
}: SwiperCarouselProps) => {
  const autoplayConfig = autoplay
    ? { delay: interval, disableOnInteraction: false }
    : false;

  const paginationConfig = pagination
    ? {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return `<span class="${className} !bg-gray-200"></span>`;
        },
      }
    : false;

  return (
    <Swiper
      autoplay={autoplayConfig}
      spaceBetween={spaceBetween}
      slidesPerView={1}
      pagination={paginationConfig}
      loop={loop}
      navigation={navigation}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-full"
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
