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
import { SlidersVertical } from "lucide-react";

export const ProductsSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-1 font-poppins relative">
      {/* Sheet Trigger for small screens */}
      <div className="xl:hidden px-5 pt-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="mb-4 uppercase absolute left-0 top-36 rotate-[-90deg] origin-top-left"
            >
              Filters
              <SlidersVertical />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 sm:w-96"
            aria-describedby={undefined}
          >
            <SheetHeader>
              <SheetTitle className="font-bold mt-5 text-3xl bg-gradient-to-r from-indigo-300 via-indigo-600 to-indigo-300 bg-clip-text text-transparent">
                Filter By ...
              </SheetTitle>
            </SheetHeader>
            <AccordionLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Normal Sidebar for larger screens */}
      <div className="xl:w-1/4 2xl:w-1/5 px-5 border-r hidden xl:block">
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

const AccordionLinks = () => {
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category[in]=${categoryId}`);
  };

  const handleBrandClick = (brandId: string) => {
    router.push(`/products?brand[in]=${brandId}`);
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold">
          Categories
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-start gap-3 px-2">
          {categories?.map((category) => (
            <SheetClose asChild key={category._id}>
              <button
                onClick={() => handleCategoryClick(category._id)}
                className="cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold"
              >
                {category.name}
              </button>
            </SheetClose>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg hover:no-underline mt-3 font-bold">
          Brands
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-start gap-3 px-2">
          {brands?.map((brand) => (
            <SheetClose key={brand._id} asChild>
              <button
                onClick={() => handleBrandClick(brand._id)}
                className="cursor-pointer dark:text-zinc-300 text-zinc-800 font-semibold"
              >
                {brand.name}
              </button>
            </SheetClose>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
