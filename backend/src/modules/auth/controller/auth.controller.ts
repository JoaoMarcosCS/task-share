import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../services/auth.service";
import { validateWithZod } from "@shared/utils/validate-with-zod";
import { z } from "zod";

const AuthSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

@injectable()
export class AuthController {
  constructor(
    @inject("AuthService")
    private readonly authService: AuthService
  ) {}

  async authenticate(req: Request, res: Response) {
    const { email, password } = validateWithZod(AuthSchema, req.body);

    const accessToken = await this.authService.login(email, password);

    return res.json({ accessToken });
  }
}
