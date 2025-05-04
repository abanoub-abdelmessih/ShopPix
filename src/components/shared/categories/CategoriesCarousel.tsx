"use client";

import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Carousel } from "../../Carousel";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export const CategoriesCarousel: React.FC = () => {
  const { data: categories, isLoading, isError, error } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="text-indigo-800">
        <Loading />
      </div>
    );
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

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category[in]=${categoryId}`);
  };

  return (
    <Carousel
      slidesPerView={7}
      spaceBetween={15}
      buttonsClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <div className="group">
            <div
              onClick={() => handleCategoryClick(category._id)}
              className="relative border-slate-900 dark:border-white/70 border-2 w-44 h-44 rounded-full overflow-hidden dark:bg-gray-100 shadow-lg cursor-pointer mx-auto hover:scale-95 duration-300"
            >
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
            <span
              className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 
            transition-all duration-300 mt-1 mx-auto"
            ></span>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  );
};
