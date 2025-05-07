"use client";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 42960;
const STEP = 10;

export const PriceRange = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Update state from URL when searchParams change
  useEffect(() => {
    const min = Number(searchParams.get("minPrice")) || MIN_PRICE;
    const max = Number(searchParams.get("maxPrice")) || MAX_PRICE;
    setPriceRange([min, max]);
  }, [searchParams]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, priceRange[1]);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, priceRange[0]);
    setPriceRange([priceRange[0], newMax]);
  };

  const handleApplyPriceFilter = () => {
    const [minPrice, maxPrice] = priceRange;
    const current = new URLSearchParams(searchParams.toString());
    current.set("minPrice", minPrice.toString());
    current.set("maxPrice", maxPrice.toString());
    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <>
      <DualRangeSlider
        className="my-3"
        value={priceRange}
        onValueChange={(value) => setPriceRange([value[0], value[1]])}
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={STEP}
      />

      <div className="flex w-full gap-2 items-center">
        <div className="flex-1">
          <Label className="text-base" htmlFor="minPrice">
            $ min price
          </Label>
          <Input
            type="number"
            id="minPrice"
            min={MIN_PRICE}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handleMinChange(+e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label className="text-base" htmlFor="maxPrice">
            $ max price
          </Label>
          <Input
            type="number"
            id="maxPrice"
            min={priceRange[0]}
            max={MAX_PRICE}
            value={priceRange[1]}
            onChange={(e) => handleMaxChange(+e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <Button onClick={handleApplyPriceFilter} className="mt-3 w-full">
        Apply Filter
      </Button>
    </>
  );
};
