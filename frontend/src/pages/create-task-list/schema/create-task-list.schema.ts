import { z } from "zod";

export const CreateTaskListSchema = z.object({
  title: z
    .string({ message: "Escolha um título" })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(255, { message: "O título não pode ter mais que 255 caracteres" }),
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
});

export type CreateTaskListDTO = z.infer<typeof CreateTaskListSchema>;
