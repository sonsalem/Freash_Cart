import { z } from "zod";

export const VerifySchema = z.object({
  resetCode: z.string().min(6, "minCode"),
});

export type VerifyData = z.infer<typeof VerifySchema>;
