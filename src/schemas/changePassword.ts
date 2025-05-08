import * as z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Please enter your Email"),
    password: z
      .string()
      .nonempty("Please enter your password")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
