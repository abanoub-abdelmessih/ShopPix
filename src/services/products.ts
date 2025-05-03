import { ProductType } from "@/types/ProductType";
import axios from "axios";

export type ProductsResponse = {
  metadata: {
    currentPage: number;
    numberOfPages: number;
    nextPage: number | null;
  };
  data: ProductType[];
};

export async function getAllProducts(
  page = 1,
  limit = 20,
  categoryId?: string
): Promise<ProductsResponse> {
  try {
    let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`;

    // Add category filter if provided
    if (categoryId) {
      url += `&category[in]=${categoryId}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        "Failed to get products. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
