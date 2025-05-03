"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export const PaginationControls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category[in]");
  const limit = 12;

  // Reset page number to 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const { data, isLoading, isError, error, isFetching } = useProducts(
    currentPage,
    limit,
    categoryId || undefined
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl">
        <Loading /> Please Wait
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        {error instanceof Error
          ? "An error occurred while loading products."
          : "Unable to fetch products at this time. Please try again later."}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col gap-3 text-xl md:text-2xl lg:text-3xl text-zinc-800 text-center">
        No products found. Please try another category or check back later.
        <Button className="group" asChild>
          <Link href={"/products"}>
            See All Products
            <ChevronsRight className="group-hover:ml-2 duration-300" />
          </Link>
        </Button>
      </div>
    );
  }

  const products = data.data || [];
  const totalPages = data?.metadata?.numberOfPages || 1;

  // Generate page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination className="mb-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => setCurrentPage(1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            >
              <ChevronsLeft /> 1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
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
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
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
              <ChevronsRight /> {totalPages}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
