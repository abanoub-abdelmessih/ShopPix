import { Heading } from "@/components/Heading";
import { PaginationControls } from "@/components/shared/products/PaginationControls";
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
      <PaginationControls />
    </ProductsSidebar>
  );
};

export default Products;
