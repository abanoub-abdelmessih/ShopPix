import { Heading } from "@/components/Heading";
import { Hero } from "@/components/Hero";
import { SaleCarousel } from "@/components/SaleCarousel";
import { CategoriesCarousel } from "@/components/shared/categories/CategoriesCarousel";
import React from "react";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Heading
        title="Browse Categories"
        description="Find what you love across all our categories"
        id="categories"
      />
      <CategoriesCarousel />
      <SaleCarousel />
      <Hero />
    </>
  );
};
export default Home;
