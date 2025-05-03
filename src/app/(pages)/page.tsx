import { FlashSale } from "@/components/shared/products/FlashSale";
import { Heading } from "@/components/Heading";
import { Hero } from "@/components/Hero";
import { SaleCarousel } from "@/components/SaleCarousel";
import { CategoriesCarousel } from "@/components/shared/categories/CategoriesCarousel";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <>
      <Hero />
      {/* Categories */}
      <Heading
        title="Browse Categories"
        description="Find what you love across all our categories"
        id="categories"
      />
      <CategoriesCarousel />
      <Separator />
      {/* Sales */}
      <SaleCarousel />
      <Heading
        title="Exclusive Offers!"
        description="Get them before they're gone!"
      />
      <FlashSale />
      <Hero />
    </>
  );
};
export default Home;
