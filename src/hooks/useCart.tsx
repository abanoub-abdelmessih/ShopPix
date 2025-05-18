import {
  addProductCart,
  clearUserCartFunction,
  getCartFunction,
  removeProductCart,
  updateProductCount,
} from "@/services/cart";
import { CartData } from "@/types/CartType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useTranslations } from "next-intl";

// GET CART
export const useGetCart = () => {
  return useQuery<CartData>({
    queryKey: ["cart"],
    queryFn: getCartFunction,
    staleTime: 5 * 60 * 1000,
  });
};

// ADD TO CART
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("CartToasts");

  return useMutation({
    mutationFn: (postId: string) => addProductCart(postId),
    onSuccess: async () => {
      const data = await getCartFunction();
      queryClient.setQueryData(["cart"], data);
      toast({
        title: t("success"),
        description: t("productAddedToCartSuccessfully"),
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorAddingProduct"),
        variant: "destructive",
      });
    },
  });
};

// UPDATE PRODUCT COUNT
export const useUpdateProductCount = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("CartToasts");

  return useMutation({
    mutationFn: ({ postId, count }: { postId: string; count: string }) =>
      updateProductCount({ postId, count }),
    onSuccess: async () => {
      const data = await getCartFunction();
      queryClient.setQueryData(["cart"], data);
      toast({
        title: t("success"),
        description: t("productCountUpdatedSuccessfully"),
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorUpdatingCount"),
        variant: "destructive",
      });
    },
  });
};

// REMOVE FROM CART
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("CartToasts");

  return useMutation({
    mutationFn: (postId: string) => removeProductCart(postId),
    onSuccess: async () => {
      const data = await getCartFunction();
      queryClient.setQueryData(["cart"], data);
      toast({
        title: t("success"),
        description: t("productRemovedSuccessfully"),
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorRemovingProduct"),
        variant: "destructive",
      });
    },
  });
};

// CLEAR CART
export const useClearCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("CartToasts");

  return useMutation({
    mutationFn: clearUserCartFunction,
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("cartClearedSuccessfully"),
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: t("failed"),
        description: error.message || t("errorAddingProduct"),
        variant: "destructive",
      });
    },
  });
};
