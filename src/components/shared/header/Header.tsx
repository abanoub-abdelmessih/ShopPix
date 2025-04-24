import Link from "next/link";
import { HeaderLinks } from "./HeaderLinks";
import { UserMenu } from "./UserMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  return (
    <header className="shadow-md py-3 px-5 font-poppins">
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
        <div className="hidden lg:flex">
          {/* Theme menu */}
          <ThemeSwitcher />
          {/* User menu */}
          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
