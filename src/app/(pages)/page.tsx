import { Separator } from "@/components/ui/separator";
import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/Loader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Home",
};

const DynamicHero = dynamic(() => import("@/components/Hero"));
const DynamicCategoriesCarousel = dynamic(
  () => import("@/components/shared/categories/CategoriesCarousel")
);
const DynamicSaleCarousel = dynamic(() => import("@/components/SaleCarousel"));
const DynamicFlashSale = dynamic(
  () => import("@/components/shared/products/FlashSale")
);
const DynamicBestSeller = dynamic(
  () => import("@/components/shared/products/BestSeller")
);

const DynamicNewCollection = dynamic(
  () => import("@/components/NewCollection")
);

const DynamicServices = dynamic(() => import("@/components/Services"));

const Home = () => {
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <DynamicHero />
        {/* Categories */}
        <DynamicCategoriesCarousel />
        <Separator />
        {/* Sales carousel*/}
        <DynamicSaleCarousel />
        {/* Sale items */}
        <DynamicFlashSale />
        {/* New Collection */}
        <DynamicNewCollection />
        {/* Best Seller Products */}
        <DynamicBestSeller />
        {/* services */}
        <DynamicServices />
        {/* Footer */}
        <Footer />
      </React.Suspense>
    </>
  );
};
export default Home;
