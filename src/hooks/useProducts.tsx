import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getSpecificProduct,
  ProductsResponse,
} from "@/services/products";
import { ProductType } from "@/types/ProductType";

export function useProducts(
  page = 1,
  limit = 20,
  categoryId?: string,
  brandId?: string
) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, limit, categoryId, brandId],
    queryFn: () => getAllProducts(page, limit, categoryId, brandId),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prevData) => prevData,
  });
}

export function useSpecificProduct(productId: string) {
  return useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: () => getSpecificProduct({ productId }),
    staleTime: 5 * 60 * 1000,
    enabled: !!productId,
  });
}
