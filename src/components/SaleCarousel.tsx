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
import Link from "next/link";

const SaleCarousel = () => {
  return (
    <Carousel
      slidesPerView={1}
      spaceBetween={0}
      hasOverlay
      breakpoints={false}
      pagination
      className="relative h-[500px] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white "
      buttonsClassName="hidden md:flex md:items-center md:justify-center md:w-12 md:h-12 md:rounded-full md:bg-white/10 md:backdrop-blur-sm md:text-white md:border md:border-white/20 md:hover:bg-white/20 md:transition-all"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/disk.jpg')] bg-cover bg-center opacity-30"></div>

      <SwiperSlide className="!flex justify-center items-center flex-col gap-8 font-poppins text-center px-4 z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          LIMITED TIME OFFER
        </div>

        <h3 className="font-extrabold text-2xl md:text-5xl tracking-tighter drop-shadow-lg flex flex-col md:flex-row items-center gap-3">
          <FlameIcon className="size-12 md:size-16 text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Hurry Up! Flash Sale
          </span>
        </h3>

        <div className="text-xl md:text-3xl flex items-center justify-center flex-wrap gap-2 font-light">
          <p className="flex items-center gap-2">
            <AlarmClockIcon className="w-6 h-6 text-red-400" />
            Enjoy up to <span className="font-bold text-red-400">70% OFF</span>
          </p>
        </div>

        <Button
          asChild
          className="uppercase font-semibold px-8 py-6 rounded-full flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 border-none text-white shadow-lg shadow-red-500/30 hover:shadow-red-600/40 transition-all duration-300 mt-4"
        >
          <Link href={"/products"}>
            <ShoppingBagIcon className="w-5 h-5" />
            Shop Now
          </Link>
        </Button>
      </SwiperSlide>

      <SwiperSlide className="!flex justify-center items-center flex-col gap-8 font-poppins text-center px-4 z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
          FLASH SALE
        </div>

        <h3 className="font-extrabold text-2xl md:text-5xl tracking-tighter drop-shadow-lg flex flex-col md:flex-row items-center gap-3">
          <ZapIcon className="size-12 md:size-16 text-yellow-400 filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Flash Deal Just for You!
          </span>
        </h3>

        <div className="text-xl md:text-3xl flex items-center justify-center flex-wrap gap-2 font-light">
          <p className="flex items-center gap-2">
            <TimerIcon className="w-6 h-6 text-yellow-400" />
            Save <span className="font-bold text-yellow-400">up to 50%</span>
          </p>
        </div>

        <Button
          asChild
          className="uppercase font-semibold px-8 py-6 rounded-full flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600  border-none text-white shadow-lg shadow-yellow-500/30 hover:shadow-yellow-600/40 transition-all duration-300 mt-4"
        >
          <Link href={"/products"}>
            <ShoppingCartIcon className="w-5 h-5" />
            Grab Deal
          </Link>
        </Button>
      </SwiperSlide>

      <SwiperSlide className="!flex justify-center items-center flex-col gap-8 font-poppins text-center px-4 z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          FREE SHIPPING
        </div>

        <h3 className="font-extrabold text-2xl md:text-5xl tracking-tighter drop-shadow-lg flex flex-col md:flex-row items-center gap-3">
          <TruckIcon className="size-12 md:size-16 text-green-400 filter drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Free Shipping Worldwide!
          </span>
        </h3>

        <div className="text-xl md:text-3xl flex items-center justify-center flex-wrap gap-2 font-light">
          <p className="flex items-center gap-2">
            <GiftIcon className="w-6 h-6 text-green-400" />
            On all orders{" "}
            <span className="font-bold text-green-400">this week</span>
          </p>
        </div>

        <Button
          asChild
          className="uppercase font-semibold px-8 py-6 rounded-full flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 border-none text-white shadow-lg shadow-green-500/30 hover:shadow-green-600/40 transition-all duration-300 mt-4"
        >
          <Link href={"/products"}>
            <MapPinIcon className="w-5 h-5" />
            Check Now
          </Link>
        </Button>
      </SwiperSlide>
    </Carousel>
  );
};

export default SaleCarousel;
