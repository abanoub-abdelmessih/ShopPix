import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

// GET USER CART
export async function getCartFunction() {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Failed",
      description: "please login again",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("No token - redirecting");
  }

  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    );

    if (response.data.status === "success") {
      return response.data;
    }
    throw new Error("Failed to get cart data");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed to get cart. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// ADD PRODUCT TO CART
export async function addProductCart(postId: string) {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Failed",
      description: "please login again",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("No token - redirecting");
  }

  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: postId },
      { headers: { token } }
    );

    if (response.data.status === "success") {
      return { success: true };
    }
    throw new Error("Failed add to cart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed add to cart. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// UPDATE PRODUCT COUNT
export async function updateProductCount({
  postId,
  count,
}: {
  postId: string;
  count: string;
}) {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Failed",
      description: "please login again",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("No token - redirecting");
  }

  try {
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${postId}`,
      { count: count },
      { headers: { token } }
    );

    if (response.data.status === "success") {
      return { success: true };
    }
    throw new Error("Failed add to cart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed add to cart. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// REMOVE PRODUCT FROM CART
export async function removeProductCart(postId: string) {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Failed",
      description: "please login again",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("No token - redirecting");
  }

  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${postId}`,
      { headers: { token } }
    );

    if (response.data.status === "success") {
      return { success: true };
    }
    throw new Error("Failed add to cart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed add to cart. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// CLEAR USER CART
export async function clearUserCartFunction() {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Failed",
      description: "please login again",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("No token - redirecting");
  }

  try {
    const response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    );

    if (response.data.message === "success") {
      return { success: true };
    }
    throw new Error("Failed to clear user cart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message ||
        "Failed to clear cart. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
