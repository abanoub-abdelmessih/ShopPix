"use client";

import Loading from "@/app/loading";
import { ProductCard } from "./ProductCard";
import { Button } from "../../ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { useSpecificCategory } from "@/hooks/useCategories";

export const FlashSale = () => {
  const { data: products, isLoading } = useSpecificCategory(5);

  if (isLoading)
    return (
      <div className="text-indigo-800">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center py-5 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-4 container">
        {products?.map((product) => (
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
