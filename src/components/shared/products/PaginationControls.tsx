"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Loader } from "@/components/Loader";
import { useSpecificCategory } from "@/hooks/useCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export const PaginationControls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category[in]");
  const brandId = searchParams.get("brand[in]");
  const subcategoryId = searchParams.get("subcategory[in]");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const limit = 12;

  const { data, isLoading, isError, error, isFetching } = useProducts(
    currentPage,
    limit,
    categoryId || undefined,
    brandId || undefined,
    subcategoryId || undefined,
    minPrice ? Number(minPrice) : undefined,
    maxPrice ? Number(maxPrice) : undefined
  );
  const { data: categoryData } = useSpecificCategory(categoryId || "");

  // Reset page number to 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, brandId, subcategoryId]);

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl ">
        <Loader /> Please Wait
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8 flex-1">
        {error instanceof Error
          ? "An error occurred while loading products."
          : "Unable to fetch products at this time. Please try again later."}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col px-4 mx-auto max-w-2xl">
        <div className="mb-6 text-gray-400">
          <svg
            className="w-20 h-20 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          No products found
        </h3>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          We couldn&apos;t find any products matching your criteria. Please try
          another category or check back later.
        </p>

        <Button
          className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/products" className="flex items-center gap-2">
            Browse All Products
            <ChevronsRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    );
  }

  const products = data.data || [];
  const totalProducts = data.results || [];
  const totalPages = data?.metadata?.numberOfPages || 1;

  // Generate page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto font-poppins">
      <div className="flex w-full justify-between items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-t from-indigo-700 via-indigo-500 to-indigo-300 bg-clip-text text-transparent">
          {categoryId && categoryData ? categoryData.name : "All products"}
          <span className="text-sm ml-2">({totalProducts})</span>
        </h2>
        <Select>
          <SelectTrigger className="w-32 md:w-[180px] gap-3">
            <ListFilter /> Sort By
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination className="mb-14 md:mb-5 flex-wrap">
        <PaginationContent className="flex-wrap gap-0">
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage(1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            >
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            >
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage(totalPages)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            >
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
