import { TaskController } from "@modules/tasks/controller/task.controller";
import { Router } from "express";
import { container } from "tsyringe";
import { TaskPermissionMiddleware } from "../middleware/task-permission";
import { AuthMiddleware } from "../middleware/auth.middleware";

export function TaskRoutes(): Router {
  const router = Router();
  const controller = container.resolve(TaskController);
  const taskPermission = container.resolve(TaskPermissionMiddleware);
  const authMiddleware = container.resolve(AuthMiddleware);

  router.patch(
    "/:id/toggle",
    authMiddleware.verifyToken.bind(authMiddleware),
    taskPermission.validate.bind(taskPermission),
    controller.toggle.bind(controller)
  );

  router.delete(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    taskPermission.validate.bind(taskPermission),
    controller.delete.bind(controller)
  );
  router.put(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    taskPermission.validate.bind(taskPermission),
    controller.update.bind(controller)
  );
  router.post(
    "/:id/comments",
    authMiddleware.verifyToken.bind(authMiddleware),
    taskPermission.validate.bind(taskPermission),
    controller.createComment.bind(controller)
  );
  router.get(
    "/:id/comments",
    authMiddleware.verifyToken.bind(authMiddleware),
    taskPermission.validate.bind(taskPermission),
    controller.findCommentsFromTask.bind(controller)
  );

  return router;
}
