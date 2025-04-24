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
import { LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { LogoutFunction } from "@/services/auth";

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/cart", name: "Cart" },
  { path: "/wishlist", name: "Wishlist" },
  { path: "/about", name: "About us" },
  { path: "/blog", name: "Blog" },
];

const NavLinksList = ({ className }: { className: string }) => {
  const pathName = usePathname();

  return (
    <ul className={className} role="list">
      {navLinks.map((link) => (
        <li key={link.path} role="listitem">
          <Link
            href={link.path}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300 block w-full",
              pathName === link.path
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
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
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader className="flex-row justify-between items-end mt-2">
            <div className="flex items-end gap-3">
              <UserMenu />
              <SheetTitle className="">ShopPix Menu</SheetTitle>
            </div>
            <ThemeSwitcher />
          </SheetHeader>
          <NavLinksList className="mt-3 flex flex-col gap-2 flex-1" />
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
