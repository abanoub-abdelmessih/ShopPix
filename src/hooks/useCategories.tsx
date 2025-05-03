import { getAllCategories, getSaleProduct } from "@/services/categories";
import { CategoriesType } from "@/types/categoriesType";
import { ProductType } from "@/types/ProductType";
import { useQuery } from "@tanstack/react-query";

// Get all categories
export const useCategories = () => {
  return useQuery<CategoriesType[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });
};

// Get Specific Category
export const useSpecificCategory = (limit: number) => {
  return useQuery<ProductType[]>({
    queryKey: ["SpecificCategory", limit],
    queryFn: () => getSaleProduct({ limit }),
    staleTime: 5 * 60 * 1000,
  });
};
