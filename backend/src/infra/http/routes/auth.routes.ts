import { AuthController } from "@modules/auth/controller/auth.controller";
import { Router } from "express";
import { container } from "tsyringe";

export function AuthRoutes(): Router {
  const router = Router();
  const controller = container.resolve(AuthController);

  router.post("/login", controller.authenticate.bind(controller));

  return router;
}
