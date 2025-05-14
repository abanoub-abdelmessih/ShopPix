import * as z from "zod";

export const addressSchema = z.object({
  name: z.string().nonempty("Please choose one"),
  details: z
    .string()
    .nonempty("Please enter your Name")
    .min(3, "Name must be at least 3 characters."),
  phone: z
    .string()
    .nonempty("Please enter your phone number")
    .min(10, "Phone number must be at least 10 digits.")
    .regex(
      /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
      "Phone number must be valid Egyptian phone number"
    ),
  city: z
    .string()
    .nonempty("Please enter your city")
    .min(3, "city must be at least 3 characters"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
