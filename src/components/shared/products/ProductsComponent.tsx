"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, brandId, subcategoryId]);

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  if (isLoading || isFetching || LoadingWishList) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1 ">
        <Loader /> {tCommon("PleaseWait")}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage description={t("IsError")} />;
  }

  if (!products || products.data.length === 0) {
    return <ErrorMessage description={t("NoProduct")} />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-t from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent">
          {categoryId && categoryData ? categoryData.name : t("AllProducts")}
          <span className="text-sm ml-2 rtl:mr-2">({products.results})</span>
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
