import { getCartFunction } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

// GET CART
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartFunction,
    staleTime: 5 * 60 * 1000,
  });
};
