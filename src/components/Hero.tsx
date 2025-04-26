import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Hero = () => {
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
      <div className="absolute inset-0 dark:bg-black/70 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl space-y-6">
        <h1 className="text-3xl sm:text-5xl font-medium font-poppins tracking-wide">
          Upgrade Your Style with Trendy Fashion
        </h1>

        {/* Paragraph */}
        <p className="text-lg sm:text-xl font-thin italic">
          Explore a curated collection of high-quality, affordable clothing
          designed to elevate your wardrobe. Find the perfect balance of
          comfort, style, and confidence for every occasion.
        </p>

        <Button variant="default" asChild>
          <Link href={"/products"}>Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};
