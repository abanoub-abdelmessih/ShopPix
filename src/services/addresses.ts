import { toast } from "@/hooks/use-toast";
import { AddressSchema } from "@/schemas/AddressSchema";
import axios from "axios";
import Cookies from "js-cookie";

// GET ADDRESS
export async function GetAddresses() {
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
      "https://ecommerce.routemisr.com/api/v1/addresses",
      { headers: { token } }
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
    throw new Error("Failed to get address");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed get address. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// ADD ADDRESS
export async function addAddresses(values: AddressSchema) {
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
      "https://ecommerce.routemisr.com/api/v1/addresses",
      values,
      { headers: { token } }
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
    throw new Error("Failed add address");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message || "Failed add address. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}

// REMOVE ADDRESS
export async function RemoveAddresses(postId: string) {
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
      `https://ecommerce.routemisr.com/api/v1/addresses/${postId}`,
      { headers: { token } }
    );
    if (response.data.status === "success") {
      return response.data.data;
    }
    throw new Error("Failed remove address");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
        return null;
      }
      const message =
        error.response?.data.message ||
        "Failed remove address. Please try again.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
}
