import axios from "axios";

export async function getAllBrands() {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ||
        "Failed to get product. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
