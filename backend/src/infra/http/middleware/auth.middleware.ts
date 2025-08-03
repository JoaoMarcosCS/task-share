import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { MessageError } from "@shared/errors/message-error.enum";
import { UnauthorizedException } from "@shared/errors/errors";
import { env } from "@shared/environment/env";

@injectable()
export class AuthMiddleware {
  constructor() {}

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(MessageError.UNAUTHORIZED);
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new UnauthorizedException(MessageError.UNAUTHORIZED);
    }

    const decoded = verify(token, env.JWT_SECRET) as {
      userId: string;
      email: string;
    };

    console.log("[auth.middleware]", decoded);
    next();
  }
}
