import { z } from "zod";

export const FindTaskByListSchema = z.object({
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
});

export type FindTaskByListDTO = z.infer<typeof FindTaskByListSchema>;
