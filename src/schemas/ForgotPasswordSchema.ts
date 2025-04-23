import * as z from "zod";

// Email schema for Forgot Password
export const EmailSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter your Email")
    .email("Invalid email address."),
});

// Schema for the reset code
export const ResetCodeSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .nonempty("Please enter the code")
    .min(5, "Code must be at least 5 digits")
    .max(6, "The code must be 6 characters")
    .regex(/^\d+$/, "Code must be digits only"),
});

// New Password schema for Forgot Password
export const NewPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter your Email")
    .email("Invalid email address."),
  newPassword: z
    .string()
    .nonempty("Please enter your password")
    .min(6, "Password must be at least 6 characters.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export type EmailSchema = z.infer<typeof EmailSchema>;
export type ResetCodeSchema = z.infer<typeof ResetCodeSchema>;
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>;
