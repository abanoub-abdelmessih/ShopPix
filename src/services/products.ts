import { ProductType } from "@/types/ProductType";
import axios from "axios";

// Get all categories
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ||
        "Failed to get Products. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
