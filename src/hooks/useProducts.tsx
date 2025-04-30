import { getAllProducts } from "@/services/products";
import { ProductType } from "@/types/ProductType";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
  });
};
