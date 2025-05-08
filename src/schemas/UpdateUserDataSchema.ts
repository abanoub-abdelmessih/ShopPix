import * as z from "zod";

export const updateUserDataSchema = z.object({
  name: z
    .string()
    .nonempty("Please enter your Name")
    .min(3, "Name must be at least 3 characters."),
});

export type UpdateUserDataSchema = z.infer<typeof updateUserDataSchema>;
