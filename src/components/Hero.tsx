import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronsDownIcon, ChevronsRightIcon } from "lucide-react";

export const Hero = () => {
  const date = new Date();
  return (
    <section className="relative h-screen flex items-center justify-start px-8 sm:px-16 text-white">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-6">
        <span className="uppercase backdrop-blur-3xl bg-white/10 border-2 border-slate-200 rounded-full p-3">
          new collection {date.getFullYear()}
        </span>

        <h1 className="text-3xl sm:text-5xl font-medium font-poppins tracking-wide mt-2">
          Upgrade Your Style with Trendy Fashion
        </h1>

        {/* Paragraph */}
        <p className="text-lg sm:text-xl font-thin italic">
          Explore a curated collection of high-quality, affordable clothing
          designed to elevate your wardrobe. Find the perfect balance of
          comfort, style, and confidence for every occasion.
        </p>

        <div className="flex gap-2">
          <Button variant="secondary" asChild>
            <Link href={"/products"} className="group uppercase">
              Explore Collections
              <ChevronsDownIcon className="group-hover:mt-2 group-hover:ml-3 duration-300" />
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link href={"/products"} className="group">
              Shop Now
              <ChevronsRightIcon className="group-hover:ml-3 duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
