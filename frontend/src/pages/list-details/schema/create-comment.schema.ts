import { z } from "zod";

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .max(255, { message: "O título não pode ter mais que 255 caracteres" }),
  listId: z.uuid({ message: "listId deve ser um UUID válido" }),
  taskId: z.uuid({ message: "taskId deve ser um UUID válido" }),
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
});

export type CreateCommentDTO = z.infer<typeof CreateCommentSchema>;
