import Link from "next/link";
import { HeaderLinks } from "./HeaderLinks";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  return (
    <header className="shadow-lg py-4 px-10 font-poppins border-b dark:border-b-slate-200 border-b-slate-900">
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
