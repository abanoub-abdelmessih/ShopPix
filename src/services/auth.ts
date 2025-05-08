import axios from "axios";
import Cookies from "js-cookie";
import { SignUpSchema } from "@/schemas/signupSchema";
import { SignInSchema } from "@/schemas/signinSchema";
import {
  EmailSchema,
  NewPasswordSchema,
  ResetCodeSchema,
} from "@/schemas/ForgotPasswordSchema";
import { ChangePasswordSchema } from "@/schemas/changePassword";

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

// FORGOT PASSWORD EMAIL
export async function SendResetCodeFunction(data: EmailSchema) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      data
    );

    if (response.data.statusMsg === "success") {
      Cookies.set("email", data.email);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// FORGOT PASSWORD CODE
export async function VerifyResetCodeFunction(data: ResetCodeSchema) {
  try {
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      data
    );
    if (response.data.status === "Success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error?.response?.data?.message || `Axios error: ${error.message}`;
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// FORGOT PASSWORD NEW PASS
export async function ResetPasswordFunction(data: NewPasswordSchema) {
  try {
    const response = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      data
    );
    console.log(data);

    if (response.data.token) {
      Cookies.set("token", response.data.token);
      Cookies.remove("email");
      window.location.href = "/";
      return response.data;
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error?.response?.data?.message || `Axios error: ${error.message}`;
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

// LOGOUT
export function LogoutFunction() {
  Cookies.remove("token");
  Cookies.remove("user");
  window.location.href = "/sign-in";
}

// CHANGE PASSWORD
export async function ChangeMyPasswordFunction(data: ChangePasswordSchema) {
  const token = Cookies.get("token");
  if (!token) {
    window.location.href = "/sign-in";
    throw new Error("You must be logged in to change your password.");
  }

  try {
    const response = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      data,
      {
        headers: {
          token,
        },
      }
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
        error.response?.data?.errors?.msg ||
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
