import axios from "axios";
import Cookies from "js-cookie";

export async function getCartFunction() {
  const token = Cookies.get("token");
  if (!token) {
    window.location.href = "/sign-in";
    return null;
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
