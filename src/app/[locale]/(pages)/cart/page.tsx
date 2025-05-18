"use client";

import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/shared/products/ErrorMessage";
import { useClearCart, useGetCart } from "@/hooks/useCart";
import {
  useAddWishlist,
  useRemoveWishlist,
  useWishlist,
} from "@/hooks/useWishlist";
import { useMemo } from "react";
import { ProductType } from "@/types/ProductType";
import { Button } from "@/components/ui/button";
import { CartTable } from "@/components/shared/cart/CartTable";
import { CartCard } from "@/components/shared/cart/CartCard";
import { Heading } from "@/components/Heading";
import { Trash } from "lucide-react";
import { CartDeleteDialog } from "@/components/shared/cart/CartDeleteDialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const CartPage = () => {
  const t = useTranslations("Cart");

  const { data: cartData, isError, isFetching, isLoading } = useGetCart();
  const { data: wishListProducts } = useWishlist();
  const { mutate: addToWishList, isPending: loadingAdd } = useAddWishlist();
  const { mutate: removeFromWishList, isPending: loadingRemove } =
    useRemoveWishlist();

  const { mutate: ClearCart, isPending: PendingClearCart } = useClearCart();

  const wishedIds = useMemo(
    () => wishListProducts?.data.map((p: ProductType) => p._id) || [],
    [wishListProducts]
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center gap-3 text-3xl flex-1">
        <Loader /> {t("Loading")}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage description={t("LoadError")} />;
  }

  if (!cartData || cartData.data.products.length === 0) {
    return (
      <ErrorMessage
        title={t("ErrorTitle")}
        description={t("ErrorDescription")}
      />
    );
  }

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishedIds.includes(productId)) {
      removeFromWishList(productId);
    } else {
      addToWishList(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Heading title={t("Title")} description={t("Description")} />

      <div className="flex bg-gradient-to-t from-indigo-700 to-indigo-400 bg-clip-text text-transparent items-center gap-2 mb-3 px-3">
        <h2 className="text-2xl font-bold">{t("CountLabel")}</h2>
        <span className="text-lg font-bold">{cartData.numOfCartItems}</span>
      </div>

      <CartTable
        cartData={cartData}
        loadingAdd={loadingAdd}
        loadingRemove={loadingRemove}
        toggleWishlist={toggleWishlist}
        wishedIds={wishedIds}
      />

      <CartCard
        cartData={cartData}
        loadingAdd={loadingAdd}
        loadingRemove={loadingRemove}
        toggleWishlist={toggleWishlist}
        wishedIds={wishedIds}
      />

      <div className="flex flex-col md:flex-row items-end sm:items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <div className="flex gap-2 flex-col md:flex-row w-full mb-4 md:mb-0">
          <CartDeleteDialog
            description={t("ClearCartConfirm")}
            isLoading={PendingClearCart}
            onConfirm={() => ClearCart()}
          >
            <Button variant="destructive">
              <Trash /> {t("ClearCart")}
            </Button>
          </CartDeleteDialog>

          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-colors "
          >
            <Link href={"/checkout"}>{t("ProceedToCheckout")}</Link>
          </Button>
        </div>

        <div className="text-xl font-semibold text-center text-gray-900 dark:text-white w-full md:w-fit">
          {t("Total")}:
          <span className="text-indigo-600 dark:text-indigo-400 ml-2 rtl:mr-2">
            ${cartData.data.totalCartPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
