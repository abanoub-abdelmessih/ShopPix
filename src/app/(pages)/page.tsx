import { Hero } from "@/components/Hero";
import Products from "./products/page";

export const metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
    </div>
  );
};
export default Home;
