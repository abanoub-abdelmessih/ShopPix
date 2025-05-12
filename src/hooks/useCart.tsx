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

  return useMutation({
    mutationFn: (postId: string) => addProductCart(postId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "product added to cart successfully",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during add product",
        variant: "destructive",
      });
    },
  });
};

// UPDATE PRODUCT COUNT
export const useUpdateProductCount = () => {
  return useMutation({
    mutationFn: ({ postId, count }: { postId: string; count: string }) =>
      updateProductCount({ postId, count }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "product count updated successfully",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during update product count",
        variant: "destructive",
      });
    },
  });
};

// REMOVE FROM CART
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => removeProductCart(postId),

    onSuccess: (_, postId) => {
      queryClient.setQueryData<CartData>(["cart"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            products: oldData.data.products.filter(
              (item) => item.product._id !== postId
            ),
          },
        };
      });

      toast({
        title: "Success",
        description: "Product removed from cart successfully",
        className: "bg-green-500",
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during removing product",
        variant: "destructive",
      });
    },
  });
};

// CLEAR CART
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearUserCartFunction,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "you cleared your cart successfully",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during add product",
        variant: "destructive",
      });
    },
  });
};
