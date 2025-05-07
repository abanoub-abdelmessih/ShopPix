import { GetAllProductsParams, ProductsResponse } from "@/types/ProductType";
import axios from "axios";

export async function getAllProducts({
  page = 1,
  limit = 20,
  categoryId,
  brandId,
  sort,
  subcategoryId,
  minPrice,
  maxPrice,
}: GetAllProductsParams): Promise<ProductsResponse> {
  try {
    let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`;

    if (categoryId) url += `&category[in]=${categoryId}`;
    if (brandId) url += `&brand[in]=${brandId}`;
    if (sort) url += `&sort=${sort}`;
    if (subcategoryId) url += `&subcategory[in]=${subcategoryId}`;
    if (minPrice !== undefined) url += `&price[gte]=${minPrice}`;
    if (maxPrice !== undefined) url += `&price[lte]=${maxPrice}`;

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

export async function getSpecificProduct({ productId }: { productId: string }) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
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

export async function getFlashSale({ limit = 0 }: { limit?: number }) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d5b90049ad0b52b90048&limit=${limit}`
    );
    return response.data.data;
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

export async function getBestSeller(categoryId: string) {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=5&category[in]=${categoryId}&sort=-sold`
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
