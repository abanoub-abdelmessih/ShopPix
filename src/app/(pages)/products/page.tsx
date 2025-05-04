import { Heading } from "@/components/Heading";
import { PaginationControls } from "@/components/shared/products/PaginationControls";

export const metadata = {
  title: "Products",
};

const Products = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center py-3 flex-1">
      <Heading
        title="Our Products"
        description="Discover top picks from all categories."
      />
      <PaginationControls />
    </div>
  );
};

export default Products;
