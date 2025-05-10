"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { PaginationBar } from "./PaginationBar";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "./ErrorMessage";
import { SortSelect } from "./SortSelect";
import { ProductCard } from "./ProductCard";
import { useSpecificCategory } from "@/hooks/useCategories";
import { ProductType } from "@/types/ProductType";
import { useWishlist } from "@/hooks/useWishlist";

export const ProductsComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category[in]");
  const brandId = searchParams.get("brand[in]");
  const sort = searchParams.get("sort");
  const subcategoryId = searchParams.get("subcategory[in]");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const limit = 12;

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useProducts({
    page: currentPage,
    limit,
    categoryId: categoryId || undefined,
    brandId: brandId || undefined,
    sort: sort || undefined,
    subcategoryId: subcategoryId || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  const { data: categoryData } = useSpecificCategory(categoryId || "");
  const { data: wishListProducts, isLoading: LoadingWishList } = useWishlist();

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, brandId, subcategoryId]);

  if (isLoading || isFetching || LoadingWishList) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 ">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage description="An error occurred while loading products." />
    );
  }

  if (!products || products.data.length === 0) {
    return (
      <ErrorMessage
        description="We couldn't find any products matching your criteria. Please try
          another category or check back later."
      />
    );
  }

  const wishedIds = wishListProducts?.data.map((p: ProductType) => p._id) || [];

  return (
    <div className="container mx-auto font-poppins">
      <div className="flex w-full justify-between items-center mb-6 gap-4">
        <h2 className="text-base md:text-2xl font-semibold bg-gradient-to-t from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent">
          {categoryId && categoryData ? categoryData.name : "All products"}
          <span className="text-sm ml-2">({products.results})</span>
        </h2>
        <SortSelect />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8 ">
        {products.data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isWished={wishedIds.includes(product._id)}
          />
        ))}
      </div>
      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={products?.metadata?.numberOfPages || 1}
      />
    </div>
  );
};
