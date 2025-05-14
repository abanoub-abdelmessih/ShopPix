"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetFooter,
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

const navLinks = [
  { path: "/", name: "Home", icon: <Home className="w-4 h-4" /> },
  {
    path: "/products",
    name: "Products",
    icon: <Barcode className="w-4 h-4" />,
  },
  { path: "/cart", name: "Cart", icon: <ShoppingCart className="w-4 h-4" /> },
  { path: "/wishlist", name: "Wishlist", icon: <Heart className="w-4 h-4" /> },
];

const NavLinksList = ({
  className,
  icons = false,
  closeSheetOnClick = false,
}: {
  className: string;
  icons?: boolean;
  closeSheetOnClick?: boolean;
}) => {
  const pathName = usePathname();

  return (
    <ul className={className} role="list">
      {navLinks.map((link) => {
        const isActive = pathName === link.path;

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

export const HeaderLinks = () => {
  return (
    <div>
      {/* Desktop Links */}
      <NavLinksList className="hidden lg:flex items-center space-x-1" />

      {/* Mobile Sheet Menu */}
      <Sheet>
        <SheetTrigger className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 ">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="flex flex-col justify-between p-0 border-l border-gray-200 dark:border-zinc-700"
          side="right"
        >
          <div className="flex flex-col h-full mt-7">
            <SheetHeader className="border-b border-gray-200 dark:border-zinc-700 p-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  Menu
                </SheetTitle>
                <ThemeSwitcher />
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
                  Sign Out
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
