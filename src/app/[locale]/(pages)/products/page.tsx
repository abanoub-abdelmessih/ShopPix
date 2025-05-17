import { Heading } from "@/components/Heading";
import { ProductsComponent } from "@/components/shared/products/ProductsComponent";
import { ProductsSidebar } from "@/components/shared/products/ProductsSidebar";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Products",
};

const Products = () => {
  const t = useTranslations("Products");
  return (
    <ProductsSidebar>
      <Heading
        title={t("Heading.title")}
        description={t("Heading.description")}
      />
      <ProductsComponent />
    </ProductsSidebar>
  );
};

export default Products;
