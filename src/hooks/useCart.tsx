import { clearUserCartFunction, getCartFunction } from "@/services/cart";
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
