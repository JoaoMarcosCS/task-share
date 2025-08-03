import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "@modules/users/controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

export function UserRoutes(): Router {
  const router = Router();
  const controller = container.resolve(UserController);
  const authMiddleware = container.resolve(AuthMiddleware);

  router.post("/", controller.create.bind(controller));

  router.get(
    "/by-email",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.findByEmail.bind(controller)
  );
  router.get(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.findById.bind(controller)
  );

  router.put(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.update.bind(controller)
  );

  return router;
}
