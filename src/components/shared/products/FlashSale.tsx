"use client";

import { ProductCard } from "./ProductCard";
import { Button } from "../../ui/button";
import { ChevronsRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Loader } from "@/components/Loader";
import { useFlashSale } from "@/hooks/useProducts";
import { Heading } from "@/components/Heading";
import { ProductType } from "@/types/ProductType";
import { useWishlist } from "@/hooks/useWishlist";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

const FlashSale = () => {
  const { data: products, isLoading } = useFlashSale(6);
  const { data: wishListProducts, isLoading: LoadingWishList } = useWishlist();
  const t = useTranslations("HomePage.FlashSale");

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );
  if (isLoading || LoadingWishList)
    return (
      <div className="text-indigo-800">
        <Loader />
      </div>
    );
  const filteredProducts = products?.filter(
    (product) => product.priceAfterDiscount
  );

  return (
    <>
      <Heading title={t("title")} description={t("description")} />
      <div className="flex flex-col items-center justify-center py-5 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 container">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isWished={wishedIds.includes(product._id)}
            />
          ))}
        </div>
        <Button className="mx-auto group" asChild>
          <Link href={"/products"}>
            {t("seeAll")}
            <ChevronsRight className="ltr:group-hover:ml-2 rtl:group-hover:mr-2 rtl:rotate-180 duration-300" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default FlashSale;
