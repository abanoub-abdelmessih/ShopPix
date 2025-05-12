"use client";

import { CartProduct } from "@/types/CartType";
import { Heart, Trash } from "lucide-react";
import { MouseEvent } from "react";
import { CartDeleteDialog } from "./CartDeleteDialog";
import { useRemoveFromCart } from "@/hooks/useCart";

interface CartActionButtonsProps {
  toggleWishlist: (productId: string, e: MouseEvent<HTMLButtonElement>) => void;
  item: CartProduct;
  loadingRemove: boolean;
  loadingAdd: boolean;
  isWished: boolean;
}

export const CartActionButtons = ({
  toggleWishlist,
  item,
  loadingRemove,
  loadingAdd,
  isWished,
}: CartActionButtonsProps) => {
  const { mutate: removeFromCart, isPending: loadingRemoveCart } =
    useRemoveFromCart();

  return (
    <>
      <button
        onClick={(e) => toggleWishlist(item.product?._id, e)}
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
        disabled={loadingAdd || loadingRemove}
      >
        <Heart
          size={20}
          className={isWished ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>
      <CartDeleteDialog
        description="this will delete this product from your cart"
        isLoading={loadingRemoveCart}
        onConfirm={() => removeFromCart(item.product._id)}
      >
        <button className="p-1 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors">
          <Trash size={20} />
        </button>
      </CartDeleteDialog>
    </>
  );
};
