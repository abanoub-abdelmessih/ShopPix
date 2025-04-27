import { CategoriesType } from "@/types/categoriesType";
import axios from "axios";

// Get all categories
export async function getAllCategories(): Promise<CategoriesType[]> {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        "Failed to get categories. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
