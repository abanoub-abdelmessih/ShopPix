"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ChevronsRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useBestSeller } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductType } from "@/types/ProductType";
import { useWishlist } from "@/hooks/useWishlist";
import { useTranslations } from "next-intl";

const BestSeller = () => {
  const t = useTranslations();
  const categories = [
    { id: "6439d5b90049ad0b52b90048", name: t("HomePage.BestSeller.Men's") },
    { id: "6439d58a0049ad0b52b9003f", name: t("HomePage.BestSeller.Women's") },
    {
      id: "6439d2d167d9aa4ca970649f",
      name: t("HomePage.BestSeller.Electronics"),
    },
  ];
  const [category, setCategory] = useState(categories[0]);
  const { data: bestProducts, isLoading } = useBestSeller(category.id);
  const { data: wishListProducts, isLoading: LoadingWishList } = useWishlist();

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  return (
    <div className="container mx-auto flex flex-col items-center py-5">
      <Heading
        title={t("HomePage.BestSeller.Heading.title")}
        description={t("HomePage.BestSeller.Heading.description")}
      />

      <Tabs
        defaultValue={category.id}
        className="w-full flex flex-col items-center"
        onValueChange={(value) => {
          const selected = categories.find((cat) => cat.id === value);
          if (selected) setCategory(selected);
        }}
      >
        <TabsList className="mb-4">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="w-full">
            {isLoading || LoadingWishList ? (
              <div className="flex justify-center my-10">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-8 p-4">
                {bestProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isWished={wishedIds.includes(product._id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Button asChild className="group mt-2">
        <Link href={`/products?category[in]=${category.id}`}>
          {t("HomePage.BestSeller.SeeAllProducts", { category: category.name })}
          <ChevronsRight className="ml-1 ltr:group-hover:ml-2 rtl:group-hover:mr-2 transition-all duration-300 rtl:rotate-180 rtl:mr-1" />
        </Link>
      </Button>
    </div>
  );
};

export default BestSeller;
