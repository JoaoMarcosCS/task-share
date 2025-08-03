import { TaskListController } from "@modules/tasks-lists/controller/task-list.controller";
import { Router } from "express";
import { container } from "tsyringe";

export function TaskListRoutes(): Router {
  const router = Router();
  const controller = container.resolve(TaskListController);

  router.post("/", controller.create.bind(controller));

  router.get("/:ownerId", controller.findListsByOwner.bind(controller));

  router.put("/:id", controller.update.bind(controller));

  router.delete("/:id", controller.delete.bind(controller));

  router.post("/:id/share", controller.share.bind(controller));

  router.delete(
    "/:id/share/:userId",
    controller.deleteSharing.bind(controller)
  );

  router.get("/:listId/tasks", controller.findTasksByList.bind(controller));

  router.post("/:listId/tasks", controller.assignTask.bind(controller));

  return router;
}
