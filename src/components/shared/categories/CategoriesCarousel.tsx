"use client";

import { Carousel } from "@/components/Carousel";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

export const CategoriesCarousel: React.FC = () => {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div className="w-full py-8 text-center">Loading categories...</div>;
  }

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <div className="w-full py-8 text-center text-red-500">
        Error: {errorMessage}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <div className="w-full py-8 text-center">No categories found</div>;
  }

  return (
    <Carousel slidesPerView={7} spaceBetween={15}>
      {categories.map((category) => (
        <SwiperSlide key={category._id} className="cursor-grab">
          <div className="relative border-slate-900 dark:border-white/70 border-2 w-44 h-44 rounded-full overflow-hidden dark:bg-gray-100 shadow-lg cursor-pointer mx-auto hover:scale-95 duration-300">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="text-center mt-3 font-semibold font-poppins uppercase">
            {category.name}
          </p>
        </SwiperSlide>
      ))}
    </Carousel>
  );
};
