"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Barcode, Heart, Home, LogOut, Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { LogoutFunction } from "@/services/auth";
import { useEffect, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLocale, useTranslations } from "next-intl";

export const HeaderLinks = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentLocale = useLocale();
  const t = useTranslations("Header");

  // هنا بنشيل بادئة اللغة من المسار قبل المقارنة
  const cleanPathname = pathname.replace(/^\/(en|ar)/, "") || "/";

  const navLinks = [
    { path: "/", name: t("nav.home"), icon: <Home className="w-4 h-4" /> },
    {
      path: "/products",
      name: t("nav.products"),
      icon: <Barcode className="w-4 h-4" />,
    },
    {
      path: "/cart",
      name: t("nav.cart"),
      icon: <ShoppingCart className="w-4 h-4" />,
    },
    {
      path: "/wishlist",
      name: t("nav.wishlist"),
      icon: <Heart className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const NavLinksList = ({
    className,
    icons = false,
    closeSheetOnClick = false,
  }: {
    className: string;
    icons?: boolean;
    closeSheetOnClick?: boolean;
  }) => {
    return (
      <ul className={className} role="list">
        {navLinks.map((link) => {
          // مقارنة مع المسار المنظف بدون بادئة اللغة
          const isActive = cleanPathname === link.path;

          const LinkComponent = (
            <Link
              href={link.path}
              className={cn(
                "font-medium transition-all duration-200 flex items-center",
                icons
                  ? "gap-3 px-3 py-2 rounded-lg w-full"
                  : "px-3 py-2 rounded-md text-sm",
                isActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {icons && (
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {link.icon}
                </span>
              )}
              {link.name}
            </Link>
          );

          return (
            <li key={link.path} role="listitem">
              {closeSheetOnClick ? (
                <SheetClose asChild>{LinkComponent}</SheetClose>
              ) : (
                LinkComponent
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {/* Desktop Links */}
      <NavLinksList className="hidden lg:flex items-center space-x-1" />

      {/* Mobile Sheet Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 ">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="flex flex-col justify-between p-0 border-l border-gray-200 dark:border-zinc-700"
          side={currentLocale === "en" ? "right" : "left"}
        >
          <div className="flex flex-col h-full mt-7">
            <SheetHeader className="border-b border-gray-200 dark:border-zinc-700 p-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  {t("menu")}
                </SheetTitle>
                <div className="flex items-center gap-1">
                  <LanguageToggle />
                  <ThemeSwitcher />
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-auto py-4 px-2">
              <NavLinksList
                className="flex flex-col gap-1"
                icons
                closeSheetOnClick
              />
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-700 p-4">
              <div className="mb-4">
                <UserMenu showName />
              </div>
              <SheetClose asChild>
                <Button
                  className="w-full justify-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  onClick={LogoutFunction}
                  variant="outline"
                >
                  <LogOut className="w-4 h-4" />
                  {t("signOut")}
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
