import { toast } from "@/hooks/use-toast";
import { Address } from "@/types/AddressType";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

// GET ALL ORDERS
export async function GetAllOrders() {
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
  const decoded = jwtDecode<DecodedToken>(token);
  const userId = decoded.id;

  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message ||
        "Failed Creating Order. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

export type CreateCashOrderProps = {
  data: Address;
  cartId: string;
};
// CREATING CASH ORDER
export async function CreateCashOrder({ data, cartId }: CreateCashOrderProps) {
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
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress: data },
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
        error.response?.data.message ||
        "Failed Creating Order. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

export type CreateOnlinePaymentOrderProps = {
  data: Address;
  cartId: string;
  baseUrl: string;
};
// CREATING OnlinePayment ORDER
export async function CreateOnlinePaymentOrder({
  data,
  cartId,
  baseUrl,
}: CreateOnlinePaymentOrderProps) {
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
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
      { shippingAddress: data },
      { headers: { token } }
    );

    if (response.data.status === "success") {
      return response.data.session;
    }
    throw new Error("Failed add to cart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message ||
        "Failed Creating Order. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
