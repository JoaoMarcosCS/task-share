import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "@modules/users/controller/user.controller";

export function UserRoutes(): Router {
  const router = Router();
  const controller = container.resolve(UserController);

  router.post("/users", controller.create.bind(controller));

  router.get("/users/by-email", controller.findByEmail.bind(controller));
  router.get("/users/:id", controller.findById.bind(controller));
  router.put("/users/:id", controller.update.bind(controller));

  return router;
}
