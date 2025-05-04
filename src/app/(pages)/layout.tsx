import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { Header } from "@/components/shared/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
