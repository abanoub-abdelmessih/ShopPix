import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { Header } from "@/components/shared/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
