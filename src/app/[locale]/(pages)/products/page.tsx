import { Heading } from "@/components/Heading";
import { ProductsComponent } from "@/components/shared/products/ProductsComponent";
import { ProductsSidebar } from "@/components/shared/products/ProductsSidebar";

export const metadata = {
  title: "Products",
};

const Products = () => {
  return (
    <ProductsSidebar>
      <Heading
        title="Our Products"
        description="Discover top picks from all categories."
      />
      <ProductsComponent />
    </ProductsSidebar>
  );
};

export default Products;
