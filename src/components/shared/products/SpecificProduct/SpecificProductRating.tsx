import { ProductType } from "@/types/ProductType";
import { RenderStars } from "../RenderStars";
import { useTranslations } from "next-intl";

export const SpecificProductRating = ({
  product,
}: {
  product: ProductType;
}) => {
  const t = useTranslations("Products.SpecificProduct");
  return (
    <div className="flex items-center mb-6">
      <div className="flex">
        <RenderStars rating={product.ratingsAverage} />
      </div>
      <span className="ml-2 rtl:mr-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
        {product.ratingsAverage?.toFixed(1) || "0.0"}
      </span>
      <span className="mx-2 text-zinc-400">•</span>
      <span className="text-sm text-zinc-600 dark:text-zinc-300">
        {product.ratingsQuantity || 0} {t("reviews")}
      </span>
      {product.sold && (
        <>
          <span className="mx-2 text-zinc-400">•</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-300">
            {product.sold} {t("sold")}
          </span>
        </>
      )}
    </div>
  );
};
