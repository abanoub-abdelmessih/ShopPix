import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getFlashSale,
  getSpecificProduct,
} from "@/services/products";
import {
  GetAllProductsParams,
  ProductsResponse,
  ProductType,
} from "@/types/ProductType";

export function useProducts(params: GetAllProductsParams) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
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

export const useFlashSale = (limit: number) => {
  return useQuery<ProductType[]>({
    queryKey: ["SpecificCategory", limit],
    queryFn: () => getFlashSale({ limit }),
    staleTime: 5 * 60 * 1000,
  });
};
