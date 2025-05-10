import {
  addWishlistFunction,
  getWishlistFunction,
  removeWishListFunction,
} from "@/services/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

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
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have added this product to wishlist!",
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
    onSuccess: () => {
      toast({
        title: "Removed",
        description: "Product removed from wishlist.",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
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
