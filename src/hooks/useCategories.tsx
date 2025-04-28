import { getAllCategories } from "@/services/categories";
import { CategoriesType } from "@/types/categoriesType";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<CategoriesType[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 5 * 60 * 1000,
  });
};
