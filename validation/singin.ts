import { z } from "zod";

export const SingInSchema = z.object({
  email: z.string().email("emailInvalid"),
  password: z.string().min(6, "passwordMin"),
});

export type SingInData = z.infer<typeof SingInSchema>;
