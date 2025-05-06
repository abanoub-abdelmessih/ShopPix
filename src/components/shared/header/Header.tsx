import Link from "next/link";
import { HeaderLinks } from "./HeaderLinks";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 scroll-mb-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between h-16"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center"
          >
            ShopPix<span className="text-black dark:text-white">.</span>
          </Link>

          {/* Navigation menu */}
          <HeaderLinks />

          {/* Actions Section */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            <UserMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};
