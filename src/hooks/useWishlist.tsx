/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addWishlistFunction,
  getWishlistFunction,
  removeWishListFunction,
} from "@/services/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { ProductType } from "@/types/ProductType";

// GET WISHLIST
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistFunction,
    staleTime: 5 * 60 * 1000,
  });
};

// ADD TO WISHLIST
export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => addWishlistFunction({ postId }),
    onMutate: (postId) => {
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any) => {
        if (!old) return old;

        const alreadyAdded = old.data.find(
          (product: ProductType) => product._id === postId
        );

        if (alreadyAdded) return old;
        const updatedData = [...old.data, { _id: postId }];
        return {
          ...old,
          data: updatedData,
          count: updatedData.length,
        };
      });

      return { previousWishlist };
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product added successfully to your wishlist",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
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

// REMOVE FROM WISHLIST
export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => removeWishListFunction({ postId }),
    onMutate: (postId) => {
      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any) => {
        if (!old) return old;

        const updatedData = old.data.filter(
          (product: ProductType) => product._id !== postId
        );

        return {
          ...old,
          data: updatedData,
          count: updatedData.length,
        };
      });
      return { previousWishlist };
    },
    onSuccess: () => {
      toast({
        title: "Removed",
        description: "Product removed from wishlist.",
        className: "bg-green-500",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed",
        description: error.message || "Error during removal",
        variant: "destructive",
      });
    },
  });
};
