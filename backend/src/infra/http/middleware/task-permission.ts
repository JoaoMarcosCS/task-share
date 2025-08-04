import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { inject, injectable } from "tsyringe";
import {
  NotFoundException,
  UnauthorizedException,
} from "@shared/errors/errors";
import { MessageError } from "@shared/errors/message-error.enum";
import { ITaskListRepository } from "@modules/tasks-lists/repository/ITaskListRepository";
import { ITaskRepository } from "@modules/tasks/repository/ITaskRepository";
import { validateWithZod } from "@shared/utils/validate-with-zod";
import { TaskPermissionSchema } from "@modules/tasks/dto/task-permission.dto";

@injectable()
export class TaskPermissionMiddleware {
  constructor(
    @inject("ITaskListRepository")
    private readonly taskListRepository: ITaskListRepository,

    @inject("ITaskRepository")
    private readonly taskRepository: ITaskRepository
  ) {}

  async validate(req: Request, res: Response, next: NextFunction) {
    const allData = {
      ...req.body,
      ...req.query,
    };

    console.log("[task.permission]: Validating", allData);

    const safeData = validateWithZod(TaskPermissionSchema, allData);

    if (!safeData.ownerId || !safeData.listId) {
      throw new UnauthorizedException(MessageError.UNAUTHORIZED);
    }

    const { ownerId, listId } = safeData;

    const hasAccess = await this.taskListRepository.hasAccess(
      ownerId,
      listId,
      true
    );

    if (!hasAccess) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    if (req.params.taskId) {
      const taskBelongs = await this.taskRepository.taskBelongsToList(
        req.params.taskId,
        listId
      );

      if (!taskBelongs) {
        throw new NotFoundException(MessageError.TASK_NOT_IN_LIST);
      }
    }

    next();
  }
}
