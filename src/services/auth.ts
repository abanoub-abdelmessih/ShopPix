import axios from "axios";
import Cookies from "js-cookie";
import { SignUpSchema } from "@/schemas/signupSchema";
import { SignInSchema } from "@/schemas/signinSchema";

// SIGN UP
export async function signUpFunction(data: SignUpSchema) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data
    );

    if (response.data.message === "success") {
      const token = response.data.token;
      const user = response.data.user;

      Cookies.set("token", token, { expires: 7, secure: true });
      Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
      window.location.href = "/";
      return { success: true };
    }

    throw new Error("Unexpected response");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to sign up. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// SIGN IN
export async function signInFunction(data: SignInSchema) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data
    );

    if (response.data.message === "success") {
      const token = response.data.token;
      const user = response.data.user;

      Cookies.set("token", token, { expires: 7, secure: true });
      Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
      window.location.href = "/";

      return { success: true };
    }

    throw new Error("Unexpected response");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to sign in. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
