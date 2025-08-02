import { z } from "zod";

export const FindUserByEmailSchema = z.object({
  email: z.string(),
});

export type FindUserByEmailDTO = z.infer<typeof FindUserByEmailSchema>;
