"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowDownIcon, ShoppingBagIcon } from "lucide-react";

export const Hero = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image*/}
      <div className="absolute inset-0 scale-105 transform-gpu">
        <Image
          src="/images/hero.jpg"
          alt="Fashion Collection"
          fill
          priority
          className="object-cover transition-transform duration-700 filter brightness-90"
        />
      </div>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-indigo-900/20" />

      {/* Content container */}
      <div className="relative h-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-2xl space-y-2">
          {/* badge */}
          <div className="inline-flex items-center mb-3 backdrop-blur-md bg-indigo-900/20 border border-indigo-300/20 rounded-full py-2.5 px-5 text-sm font-medium tracking-wider text-indigo-50 shadow-lg">
            <span className="mr-2 text-indigo-300">★</span>
            <span>NEW COLLECTION {currentYear}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            <span className="block">Redefine Your Style</span>
            <span className="block text-indigo-300 mt-2">
              With Premium Fashion
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-100 mb-10 max-w-lg backdrop-blur-sm bg-black/20 p-5 rounded-lg border-l-4 border-indigo-500 shadow-xl">
            Discover our exclusive collection of thoughtfully crafted clothing
            that combines bold aesthetics with everyday comfort. Designed for
            those who aspire to make a statement.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap gap-5">
            <Button
              className="group bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 text-base py-6 px-8 rounded-lg shadow-xl relative overflow-hidden"
              asChild
            >
              <Link href="/products">
                <span className="flex items-center relative z-10">
                  Shop Collection
                  <ShoppingBagIcon className="ml-2 w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                </span>
                <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
              </Link>
            </Button>

            <Button
              className="group bg-white/10 backdrop-blur-md border border-indigo-400/30 hover:bg-indigo-900/30 text-white transition-all duration-300 text-base py-6 px-8 rounded-lg shadow-lg"
              asChild
            >
              <Link href="#categories">
                <span className="flex items-center">
                  Explore Categories
                  <ArrowDownIcon className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-y-1" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
