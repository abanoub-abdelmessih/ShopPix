import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getBestSeller,
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
    queryKey: ["specificProduct", productId],
    queryFn: () => getSpecificProduct({ productId }),
    staleTime: 5 * 60 * 1000,
    enabled: !!productId,
  });
}

export const useFlashSale = (limit: number) => {
  return useQuery<ProductType[]>({
    queryKey: ["flashSale", limit],
    queryFn: () => getFlashSale({ limit }),
    staleTime: 5 * 60 * 1000,
  });
};

export const useBestSeller = (categoryId: string) => {
  return useQuery<ProductType[]>({
    queryKey: ["bestSeller", categoryId],
    queryFn: () => getBestSeller(categoryId),
    staleTime: 5 * 60 * 1000,
  });
};
