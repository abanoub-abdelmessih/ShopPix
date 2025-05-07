import { getAllCategories, getSpecificCategory } from "@/services/categories";
import { CategoriesType } from "@/types/categoriesType";
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
export const useSpecificCategory = (categoryId: string) => {
  return useQuery<CategoriesType>({
    queryKey: ["category", categoryId],
    queryFn: () => getSpecificCategory({ categoryId }),
    staleTime: 5 * 60 * 1000,
  });
};
