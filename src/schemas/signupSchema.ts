import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Please enter your Name")
      .min(3, "Name must be at least 3 characters."),
    email: z
      .string()
      .nonempty("Please enter your Email")
      .email("Invalid email address."),
    phone: z
      .string()
      .nonempty("Please enter your phone number")
      .min(10, "Phone number must be at least 10 digits.")
      .regex(
        /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
        "Phone number must be valid Egyptian phone number"
      ),
    password: z
      .string()
      .nonempty("Please enter your password")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    rePassword: z.string().nonempty("Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Please accept Terms and Conditions.",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
