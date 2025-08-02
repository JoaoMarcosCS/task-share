import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "@modules/users/controller/user.controller";

export function UserRoutes(): Router {
  const router = Router();
  const controller = container.resolve(UserController);

  router.post("/", controller.create.bind(controller));

  router.get("/by-email", controller.findByEmail.bind(controller));
  router.get("/:id", controller.findById.bind(controller));
  router.put("/:id", controller.update.bind(controller));

  return router;
}
