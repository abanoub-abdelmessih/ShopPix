import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter your Email")
    .email("Invalid email address."),
  password: z.string().nonempty("Please enter your password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
