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
} from "@/components/ui/sheet";
import { useBrands } from "@/hooks/useBrands";
import { useCategories } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsRight, SlidersVertical } from "lucide-react";
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { PriceRange } from "./PriceRange";
import { useTranslations } from "next-intl";

export const ProductsSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSheet, setOpenSheet] = useState(false);
  const t = useTranslations("Products");

  return (
    <div className="flex flex-1 relative">
      {/* Sheet Trigger for small screens */}
      <div className="xl:hidden">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="mb-4 uppercase fixed left-0 top-52 rotate-[-90deg] origin-top-left z-50"
            >
              {t("Filters")}
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
                {t("FilterBy")}
              </SheetTitle>
            </SheetHeader>
            <AccordionLinks setOpenSheet={setOpenSheet} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Normal Sidebar for larger screens */}
      <div className="xl:w-1/4 2xl:w-1/5 px-5 border-r rtl:border-l hidden xl:block border-t">
        <div className="sticky top-[84px]">
          <h3 className="font-bold mt-5 text-3xl bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-300 bg-clip-text text-transparent">
            {t("FilterBy")}
          </h3>
          <AccordionLinks />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-7 container mx-auto">
        {children}
      </div>
    </div>
  );
};

const AccordionLinks = ({
  setOpenSheet,
}: {
  setOpenSheet?: (openSheet: boolean) => void;
}) => {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const router = useRouter();
  const t = useTranslations("Products");

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category[in]=${categoryId}`);
    setOpenSheet?.(false);
  };

  const handleBrandClick = (brandId: string) => {
    router.push(`/products?brand[in]=${brandId}`);
    setOpenSheet?.(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Accordion type="single" collapsible>
        {categories && categories.length > 0 && (
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
              {t("Categories")}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 p-2 max-h-80 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className="text-xs cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold border-2 rounded p-2 hover:scale-90 duration-300 focus:scale-90"
                >
                  {category.name}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {brands && brands.length > 0 && (
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
              {t("Brands")}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-3 p-2 max-h-80 overflow-y-auto">
              {brands.map((brand) => (
                <button
                  key={brand._id}
                  onClick={() => handleBrandClick(brand._id)}
                  className="cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold border-2 rounded p-2 hover:scale-90 duration-300 focus:scale-90"
                >
                  {brand.name}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold uppercase">
            {t("Price")}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col items-start gap-3 px-2">
            <PriceRange />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button asChild variant="outline">
        <Link
          href="/products"
          className="flex items-center gap-2 group"
          onClick={() => setOpenSheet?.(false)}
        >
          {t("ClearFilters")}
          <ChevronsRight className="w-5 h-5 transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" />
        </Link>
      </Button>
    </div>
  );
};
