import { getAllBrands } from "@/services/brand";
import { BrandType } from "@/types/BrandType";
import { useQuery } from "@tanstack/react-query";

// Get all brands
export const useBrands = () => {
  return useQuery<BrandType[]>({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    staleTime: 5 * 60 * 1000,
  });
};
