import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(255, { message: "O título não pode ter mais que 255 caracteres" }),
  completed: z.boolean().optional().default(false),
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
});

export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;
