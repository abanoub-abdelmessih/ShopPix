import { useQuery } from "@tanstack/react-query";
import { getAllProducts, ProductsResponse } from "@/services/products";

export function useProducts(page = 1, limit = 20, categoryId?: string) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, limit, categoryId],
    queryFn: () => getAllProducts(page, limit, categoryId),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prevData) => prevData,
  });
}
