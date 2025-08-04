import { z } from "zod";

export const CreateShareSchema = z.object({
  usersId: z
    .array(z.uuid({ message: "Cada ID de usuário deve ser um UUID válido" }))
    .nonempty({ message: "A lista de usuários não pode estar vazia" }),
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
  taskListId: z.uuid({ message: "taskListId deve ser um UUID válido" }),
});

export type CreateShareDTO = z.infer<typeof CreateShareSchema>;
