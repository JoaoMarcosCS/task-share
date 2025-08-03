import { TaskController } from "@modules/tasks/controller/task.controller";
import { Router } from "express";
import { container } from "tsyringe";
import { TaskPermissionMiddleware } from "../middleware/task-permission";

export function TaskRoutes(): Router {
  const router = Router();
  const controller = container.resolve(TaskController);
  const taskPermission = container.resolve(TaskPermissionMiddleware);

  router.patch(
    "/:id/toggle",
    taskPermission.validate.bind(taskPermission),
    controller.toggle.bind(controller)
  );
  router.delete(
    "/:id",
    taskPermission.validate.bind(taskPermission),
    controller.delete.bind(controller)
  );
  router.put(
    "/:id",
    taskPermission.validate.bind(taskPermission),
    controller.update.bind(controller)
  );
  router.post(
    "/:id/comments",
    taskPermission.validate.bind(taskPermission),
    controller.createComment.bind(controller)
  );
  router.get(
    "/:id/comments",
    taskPermission.validate.bind(taskPermission),
    controller.findCommentsFromTask.bind(controller)
  );

  return router;
}
