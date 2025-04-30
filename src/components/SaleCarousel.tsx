"use client";

import { SwiperSlide } from "swiper/react";
import { Carousel } from "./Carousel";
import { Button } from "./ui/button";
import {
  AlarmClockIcon,
  FlameIcon,
  GiftIcon,
  MapPinIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TimerIcon,
  TruckIcon,
  ZapIcon,
} from "lucide-react";

export const SaleCarousel = () => {
  return (
    <Carousel
      slidesPerView={1}
      spaceBetween={0}
      hasOverlay
      breakpoints={false}
      pagination
      className="bg-[url('/images/disk.jpg')] h-[400px] bg-cover bg-center text-white"
      buttonsClassName="hidden md:block"
    >
      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-xl md:text-4xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 lg:gap-3">
          <FlameIcon className="size-10 md:size-14 text-red-600 animate-bounce" />
          Hurry Up! Limited Time Offer!
        </h3>
        <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <AlarmClockIcon className="w-6 h-6 animate-ping" />
          <p>
            Enjoy up to <span className="font-bold underline">70% OFF</span> –
            Don’t miss out!
          </p>
        </div>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <ShoppingBagIcon className="w-5 h-5" />
          Shop Now
        </Button>
      </SwiperSlide>
      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-xl md:text-4xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 lg:gap-3">
          <ZapIcon className="size-10 md:size-14 text-yellow-400 animate-bounce" />
          Flash Deal Just for You!
        </h3>
        <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <TimerIcon className="w-6 h-6 animate-ping" />
          <p>
            Save <span className="font-bold underline">up to 50%</span> before
            time runs out!
          </p>
        </div>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <ShoppingCartIcon className="w-5 h-5" />
          Grab Deal
        </Button>
      </SwiperSlide>

      <SwiperSlide className="!flex justify-center items-center flex-col gap-5 font-poppins text-center">
        <h3 className="font-extrabold text-xl md:text-4xl tracking-tight drop-shadow-md animate-pulse flex items-center gap-1 lg:gap-3">
          <TruckIcon className="size-10 md:size-14 text-green-500 animate-bounce" />
          Free Shipping!
        </h3>
        <div className="text-lg sm:text-xl md:text-2xl flex items-center justify-center flex-wrap gap-2">
          <GiftIcon className="w-6 h-6 animate-ping" />
          <p>
            On all orders –{" "}
            <span className="font-bold underline">limited time</span>!
          </p>
        </div>
        <Button className="uppercase font-semibold rounded-full flex items-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          Check Now
        </Button>
      </SwiperSlide>
    </Carousel>
  );
};
