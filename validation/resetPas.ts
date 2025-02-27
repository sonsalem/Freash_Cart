import { z } from "zod";

export const ResetPaswordSchema = z.object({
  email: z.string().email("emailInvalid"),
  newPassword: z.string().min(6, "passwordMin"),
});

export type ResetPaswordData = z.infer<typeof ResetPaswordSchema>;
