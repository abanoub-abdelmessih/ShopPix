"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowUpNarrowWide, ArrowUpWideNarrow, ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-32 md:w-[180px] gap-3">
        <ListFilter /> Sort By
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-price" className="uppercase flex cursor-pointer">
          <span className="flex gap-2 items-center">
            <ArrowUpWideNarrow className="size-5" /> High to low
          </span>
        </SelectItem>
        <SelectItem value="price" className="uppercase flex cursor-pointer">
          <span className="flex gap-2 items-center">
            <ArrowUpNarrowWide className="size-5" />
            Low to high
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
