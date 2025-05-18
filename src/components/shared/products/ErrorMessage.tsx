"use client";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const ErrorMessage = ({
  title,
  description,
}: {
  title?: string;
  description: string;
}) => {
  const t = useTranslations("Common");
  const defaultTitle = t("NoProductsFound");

  return (
    <div className="flex items-center justify-center flex-col px-4 mx-auto max-w-2xl flex-1">
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
        {title || defaultTitle}
        {/* Use provided title or fallback to translated default */}
      </h3>

      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        {description}
      </p>

      <Button
        className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        asChild
      >
        <Link href="/products" className="flex items-center gap-2">
          {t("BrowseAllProducts")}
          <ChevronsRight className="w-5 h-5 transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" />
        </Link>
      </Button>
    </div>
  );
};
