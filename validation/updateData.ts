import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(3, "nameMin").max(20, "nameMax").optional(),
  email: z.string().email("emailInvalid").optional(),
  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, "phoneInvalid")
    .optional(),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
