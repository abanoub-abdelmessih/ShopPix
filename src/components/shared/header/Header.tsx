"use client";
import Link from "next/link";
import { HeaderLinks } from "./HeaderLinks";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useScrolled } from "@/hooks/useScrolled";
import clsx from "clsx";

export const Header = () => {
  const scrolled = useScrolled(100);
  return (
    <header
      className={clsx(
        "shadow-lg py-4 px-5 font-poppins fixed top-0 inset-x-0 border-b z-50 transition-colors duration-300",
        scrolled
          ? "bg-white text-black border-b-slate-800 dark:bg-slate-900 dark:text-white dark:border-b-slate-400"
          : "bg-transparent text-white border-slate-300"
      )}
    >
      <nav
        className="flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          ShopPix.
        </Link>

        {/* Navigation menu */}
        <HeaderLinks />
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme menu */}
          <ThemeSwitcher />
          {/* User menu */}
          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
