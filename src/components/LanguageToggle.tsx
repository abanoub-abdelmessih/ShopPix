"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchToLocale = (newLocale: "en" | "ar") => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="focus-visible:ring-0 focus-visible:ring-offset-0 !mt-0"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        <DropdownMenuItem
          onClick={() => switchToLocale("en")}
          className="cursor-pointer justify-between"
        >
          English
          {currentLocale === "en" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer justify-between"
          onClick={() => switchToLocale("ar")}
        >
          العربية
          {currentLocale === "ar" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
