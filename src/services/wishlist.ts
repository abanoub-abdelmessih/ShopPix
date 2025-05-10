import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

// GET WISHLIST
export async function getWishlistFunction() {
  const token = Cookies.get("token");
  if (!token) {
    window.location.href = "/sign-in";
    throw new Error("You must be logged in to get your wishlist.");
  }

  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.status === "success") {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ||
        "Failed to get wishlist. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// ADD TO WISHLIST
export async function addWishlistFunction({ postId }: { postId: string }) {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Please log in",
      description: "You need to log in to add to wishlist.",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("You must be logged in.");
  }

  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: postId },
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.status === "success") {
      return { success: true };
    }
    throw new Error("Unexpected response");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ||
        "Failed to add to wishlist. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// REMOVE FROM WISHLIST
export async function removeWishListFunction({ postId }: { postId: string }) {
  const token = Cookies.get("token");
  if (!token) {
    toast({
      title: "Please log in",
      description: "You need to log in to add to wishlist.",
      variant: "destructive",
    });
    window.location.href = "/sign-in";
    throw new Error("You must be logged in.");
  }
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${postId}`,
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.status === "success") {
      return { success: true };
    }
    throw new Error("Unexpected response");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ||
        "Failed to remove from wishlist. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
