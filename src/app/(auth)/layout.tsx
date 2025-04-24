import { AuthCarousel } from "@/components/shared/auth/auth-carousel";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen">
      <div className="w-full lg:w-1/2 px-2 flex-1 flex justify-center items-center">
        {children}
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <AuthCarousel />
      </div>
    </main>
  );
};

export default Layout;
