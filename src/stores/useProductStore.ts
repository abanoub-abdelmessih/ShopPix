import { ProductType } from "@/types/ProductType";
import { create } from "zustand";

interface ProductStore {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
