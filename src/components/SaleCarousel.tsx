"use client";

import { SwiperSlide } from "swiper/react";
import { Carousel } from "./Carousel";
import { Button } from "./ui/button";
import {
  AlarmClockIcon,
  CalendarIcon,
  FlameIcon,
  GiftIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  TimerIcon,
  ZapIcon,
} from "lucide-react";

export const SaleCarousel = () => {
  return (
    <Carousel
      slidesPerView={1}
      spaceBetween={0}
      hasOverlay
      breakpoints={false}
      className="bg-[url('/images/disk.jpg')] h-[400px] bg-cover bg-center text-white"
    >
      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-2xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 md:gap-3">
          <FlameIcon className="size-10 md:size-14 text-red-600 animate-bounce" />
          Hurry Up! Limited Time Offer!
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <AlarmClockIcon className="w-6 h-6 animate-ping" />
          Enjoy up to <span className="font-bold underline">70% OFF</span> –
          Don’t miss out!
        </p>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <ShoppingBagIcon className="w-5 h-5" />
          Shop Now
        </Button>
      </SwiperSlide>
      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-2xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 md:gap-3">
          <ZapIcon className="size-10 md:size-14 text-yellow-400 animate-bounce" />
          Flash Deal Just for You!
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <TimerIcon className="w-6 h-6 animate-ping" />
          Save <span className="font-bold underline">up to 50%</span> before
          time runs out!
        </p>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <ShoppingCartIcon className="w-5 h-5" />
          Grab Deal
        </Button>
      </SwiperSlide>

      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-2xl sm:text-5xl md:text-6xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 md:gap-3">
          <GiftIcon className="size-10 md:size-14 text-pink-500 animate-bounce" />
          Exclusive Weekend Bonanza!
        </h3>
        <p className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <CalendarIcon className="w-6 h-6 animate-ping" />
          Limited offers until{" "}
          <span className="font-bold underline">Sunday Night</span> only!
        </p>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <StoreIcon className="w-5 h-5" />
          Explore Offers
        </Button>
      </SwiperSlide>
    </Carousel>
  );
};
