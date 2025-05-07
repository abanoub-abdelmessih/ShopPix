import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getFlashSale,
  getSpecificProduct,
  ProductsResponse,
} from "@/services/products";
import { ProductType } from "@/types/ProductType";

export function useProducts(
  page = 1,
  limit = 20,
  categoryId?: string,
  brandId?: string,
  subcategoryId?: string,
  minPrice?: number,
  maxPrice?: number
) {
  return useQuery<ProductsResponse, Error>({
    queryKey: [
      "products",
      page,
      limit,
      categoryId,
      brandId,
      subcategoryId,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getAllProducts(
        page,
        limit,
        categoryId,
        brandId,
        subcategoryId,
        minPrice,
        maxPrice
      ),
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

// Get FlashSale products
export const useFlashSale = (limit: number) => {
  return useQuery<ProductType[]>({
    queryKey: ["SpecificCategory", limit],
    queryFn: () => getFlashSale({ limit }),
    staleTime: 5 * 60 * 1000,
  });
};
