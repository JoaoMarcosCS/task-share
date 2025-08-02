import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(255, { message: "O nome não pode ter mais que 255 caracteres" }),

  email: z.email({ message: "E-mail inválido" }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(10, { message: "A senha não pode ter mais que 100 caracteres" })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" }),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

