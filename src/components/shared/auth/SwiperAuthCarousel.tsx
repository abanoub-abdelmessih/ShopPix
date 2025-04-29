"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperCarouselProps {
  children: React.ReactNode;
  interval?: number;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  direction?: "horizontal" | "vertical" | undefined;
}

export const SwiperAuthCarousel = ({
  children,
  interval = 3000,
  loop = false,
  navigation = false,
  pagination = false,
  autoplay = false,
  spaceBetween = 50,
  slidesPerView = 1,
  direction = "horizontal",
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
      direction={direction}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={paginationConfig}
      loop={loop}
      slidesPerGroup={1}
      navigation={navigation}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-full"
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))
      ) : (
        <SwiperSlide>{children}</SwiperSlide>
      )}
    </Swiper>
  );
};
