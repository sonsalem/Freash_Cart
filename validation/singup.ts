import { z } from "zod";

export const SingUpSchema = z
  .object({
    name: z.string().min(3, "nameMin").max(20, "nameMax"),
    email: z.string().email("emailInvalid"),
    phone: z.string().regex(/^01[0-9]{9}$/, "phoneInvalid"),
    password: z.string().min(6, "passwordMin"),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "passwordMismatch",
    path: ["rePassword"],
  });

export type SingUpData = z.infer<typeof SingUpSchema>;
