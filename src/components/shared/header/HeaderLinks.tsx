"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Barcode,
  Heart,
  Home,
  LogOut,
  Menu,
  ShoppingCart,
  Smartphone,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { LogoutFunction } from "@/services/auth";

const navLinks = [
  { path: "/", name: "Home", icon: <Home /> },
  { path: "/products", name: "Products", icon: <Barcode /> },
  { path: "/cart", name: "Cart", icon: <ShoppingCart /> },
  { path: "/wishlist", name: "Wishlist", icon: <Heart /> },
  { path: "/about", name: "About us", icon: <Users /> },
  { path: "/contactUs", name: "Contact us", icon: <Smartphone /> },
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
        const LinkComponent = (
          <Link
            href={link.path}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300 w-full flex gap-3 items-center",
              pathName === link.path
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            )}
          >
            {icons && link.icon}
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
      <NavLinksList className="hidden lg:flex gap-2 items-center" />

      {/* Mobile Sheet Menu */}
      <Sheet>
        <SheetTrigger className="lg:hidden items-center flex">
          <Menu />
        </SheetTrigger>
        <SheetContent
          className="flex flex-col justify-between px-3"
          aria-describedby={undefined}
        >
          <SheetHeader className="flex-row justify-between items-center mt-5">
            <div className="flex items-end gap-3">
              <UserMenu />
              <SheetTitle className="">ShopPix Menu</SheetTitle>
            </div>
            <ThemeSwitcher />
          </SheetHeader>
          <NavLinksList
            className="mt-3 flex flex-col gap-2 flex-1"
            icons
            closeSheetOnClick
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="gap-2 text-red-500"
                onClick={LogoutFunction}
                variant={"ghost"}
              >
                <LogOut />
                Sign Out
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
