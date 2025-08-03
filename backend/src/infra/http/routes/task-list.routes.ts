import { TaskListController } from "@modules/tasks-lists/controller/task-list.controller";
import { Router } from "express";
import { container } from "tsyringe";
import { AuthMiddleware } from "../middleware/auth.middleware";

export function TaskListRoutes(): Router {
  const router = Router();
  const controller = container.resolve(TaskListController);
  const authMiddleware = container.resolve(AuthMiddleware);

  router.post(
    "/",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.create.bind(controller)
  );

  router.get(
    "/:ownerId",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.findListsByOwner.bind(controller)
  );

  router.put(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.update.bind(controller)
  );

  router.delete(
    "/:id",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.delete.bind(controller)
  );

  router.post(
    "/:id/share",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.share.bind(controller)
  );

  router.delete(
    "/:id/share/:userId",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.deleteSharing.bind(controller)
  );

  router.get(
    "/:listId/tasks",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.findTasksByList.bind(controller)
  );

  router.post(
    "/:listId/tasks",
    authMiddleware.verifyToken.bind(authMiddleware),
    controller.assignTask.bind(controller)
  );

  return router;
}
