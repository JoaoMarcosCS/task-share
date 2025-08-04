import { z } from "zod";

export const TaskPermissionSchema = z
  .object({
    ownerId: z.uuid({ message: "ownerId deve ser um UUID válido" }),
    listId: z.uuid({ message: "listId deve ser um UUID válido" }),
  })
  .partial();
