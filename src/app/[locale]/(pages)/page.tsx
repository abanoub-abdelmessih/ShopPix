import { Separator } from "@/components/ui/separator";
import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/Loader";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Home",
};

const DynamicHero = dynamic(() => import("@/components/Hero"), {
  loading: () => <Loader />,
});
const DynamicCategoriesCarousel = dynamic(
  () => import("@/components/shared/categories/CategoriesCarousel"),
  {
    loading: () => <Loader />,
  }
);
const DynamicSaleCarousel = dynamic(() => import("@/components/SaleCarousel"), {
  loading: () => <Loader />,
});
const DynamicFlashSale = dynamic(
  () => import("@/components/shared/products/FlashSale"),
  {
    loading: () => <Loader />,
  }
);
const DynamicBestSeller = dynamic(
  () => import("@/components/shared/products/BestSeller"),
  {
    loading: () => <Loader />,
  }
);

const DynamicNewCollection = dynamic(
  () => import("@/components/NewCollection"),
  {
    loading: () => <Loader />,
  }
);

const DynamicServices = dynamic(() => import("@/components/Services"), {
  loading: () => <Loader />,
});

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
        <Separator />
        {/* New Collection */}
        <DynamicNewCollection />
        <Separator />
        {/* Best Seller Products */}
        <DynamicBestSeller />
        <Separator />
        {/* services */}
        <DynamicServices />
        {/* Footer */}
        <Footer />
      </React.Suspense>
    </>
  );
};
export default Home;
