import { z } from "zod";
import { CreateTaskListSchema } from "./create-task-list.dto";

export const UpdateTaskListSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter pelo menos 3 caracteres" })
    .max(255, { message: "O título não pode ter mais que 255 caracteres" })
    .optional(),
  ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
});

export type UpdateTaskListDTO = z.infer<typeof UpdateTaskListSchema>;
