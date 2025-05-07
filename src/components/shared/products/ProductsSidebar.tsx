"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useBrands } from "@/hooks/useBrands";
import { useCategories } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsRight, SlidersVertical } from "lucide-react";
import React from "react";
import Link from "next/link";
import { PriceRange } from "./PriceRange";

export const ProductsSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-1 font-poppins relative">
      {/* Sheet Trigger for small screens */}
      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="mb-4 uppercase fixed left-0 top-52 rotate-[-90deg] origin-top-left z-50"
            >
              Filters
              <SlidersVertical />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[90%]"
            aria-describedby={undefined}
          >
            <SheetHeader>
              <SheetTitle className="font-bold mt-5 text-3xl bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-300 bg-clip-text text-transparent">
                Filter By ...
              </SheetTitle>
            </SheetHeader>
            <AccordionLinks closeOnClick />
          </SheetContent>
        </Sheet>
      </div>

      {/* Normal Sidebar for larger screens */}
      <div className="xl:w-1/4 2xl:w-1/5 px-5 border-r hidden xl:block border-t">
        <div className="sticky top-[84px]">
          <h3 className="font-bold mt-5 text-3xl bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-300 bg-clip-text text-transparent">
            Filter By ...
          </h3>
          <AccordionLinks />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-7">{children}</div>
    </div>
  );
};

const AccordionLinks = ({
  closeOnClick = false,
}: {
  closeOnClick?: boolean;
}) => {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category[in]=${categoryId}`);
  };

  const handleBrandClick = (brandId: string) => {
    router.push(`/products?brand[in]=${brandId}`);
  };

  const Wrapper = closeOnClick ? SheetClose : React.Fragment;

  return (
    <div className="flex flex-col gap-3">
      <Accordion type="single" collapsible>
        {categories && categories?.length > 0 && (
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
              Categories
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 p-2 max-h-80 overflow-y-auto">
              {categories?.map((category) => (
                <Wrapper
                  key={category._id}
                  {...(closeOnClick ? { asChild: true } : {})}
                >
                  <button
                    onClick={() => handleCategoryClick(category._id)}
                    className="cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold border-2 rounded p-2 hover:scale-90 duration-300 focus:scale-90"
                  >
                    {category.name}
                  </button>
                </Wrapper>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {brands && brands?.length > 0 && (
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
              Brands
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 p-2 max-h-80 overflow-y-auto">
              {brands?.map((brand) => (
                <Wrapper
                  key={brand._id}
                  {...(closeOnClick ? { asChild: true } : {})}
                >
                  <button
                    onClick={() => handleBrandClick(brand._id)}
                    className="cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold border-2 rounded p-2 hover:scale-90 duration-300 focus:scale-90"
                  >
                    {brand.name}
                  </button>
                </Wrapper>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
            Price
          </AccordionTrigger>
          <AccordionContent className="flex flex-col items-start gap-3 px-2">
            {/* Slider for price range */}
            <PriceRange />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button asChild variant="outline">
        <Link href="/products" className="flex items-center gap-2">
          Clear Filters
          <ChevronsRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </Button>
    </div>
  );
};
