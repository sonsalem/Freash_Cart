import { z } from "zod";

export const ForgetPaswordSchema = z.object({
  email: z.string().email("emailInvalid"),
});

export type ForgetPaswordData = z.infer<typeof ForgetPaswordSchema>;
