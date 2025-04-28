import { Heading } from "@/components/Heading";
import { Hero } from "@/components/Hero";
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
        title="Categories"
        description="Explore our categories"
        id="categories"
      />
      <CategoriesCarousel />
    </>
  );
};
export default Home;
