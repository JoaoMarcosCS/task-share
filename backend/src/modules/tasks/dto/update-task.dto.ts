import { z } from "zod";

export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(255, { message: "O título não pode ter mais que 255 caracteres" })
    .optional(),

  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
  listId: z.uuid({ message: "listId deve ser um UUID válido" }),
});

export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;
