"use client";

import Loading from "@/app/loading";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export const FlashSale = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) return <Loading />;

  const flashSaleProducts = products
    ?.filter(
      (product) =>
        product.category?.name === "Men's Fashion" &&
        product.priceAfterDiscount &&
        product.price > 1000
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
        {flashSaleProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Button className="mx-auto group" asChild>
        <Link href={"/products"}>
          See All <ChevronsRight className="group-hover:ml-2 duration-300" />
        </Link>
      </Button>
    </div>
  );
};
