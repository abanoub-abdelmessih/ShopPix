"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpNarrowWide, ArrowUpWideNarrow, ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SortSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Products");

  const [sortValue, setSortValue] = useState<string | undefined>(
    searchParams.get("sort") ?? ""
  );

  useEffect(() => {
    const sort = searchParams.get("sort") ?? "";
    setSortValue(sort);
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
    setSortValue(value);
  };

  const sortLabel = {
    "-price": t("HighToLow"),
    price: t("LowToHigh"),
  };

  return (
    <Select onValueChange={handleSortChange} value={sortValue}>
      <SelectTrigger className="w-full md:w-[300px] gap-3">
        <ListFilter />
        <SelectValue placeholder={t("SortBy")} className="capitalize">
          {sortLabel[sortValue as keyof typeof sortLabel] ?? t("SortBy")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-price" className="uppercase flex cursor-pointer">
          <span className="flex gap-2 items-center">
            <ArrowUpWideNarrow className="size-5" />
            {t("HighToLow")}
          </span>
        </SelectItem>
        <SelectItem value="price" className="uppercase flex cursor-pointer">
          <span className="flex gap-2 items-center">
            <ArrowUpNarrowWide className="size-5" />
            {t("LowToHigh")}
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
