import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TaskListService } from "../services/task-list.service";
import { validateWithZod } from "@shared/utils/validate-with-zod";
import { CreateTaskListSchema } from "../dto/create-task-list.dto";
import { UpdateTaskListSchema } from "../dto/update-task-list.dto";

@injectable()
export class TaskListController {
  constructor(
    @inject("TaskListService")
    private taskListService: TaskListService
  ) {}

  async create(req: Request, res: Response) {
    const safeData = validateWithZod(CreateTaskListSchema, req.body);

    const result = await this.taskListService.createTaskList(safeData);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const safeData = validateWithZod(UpdateTaskListSchema, req.body);

    const result = await this.taskListService.updateTaskList(
      id,
      safeData.ownerId,
      safeData
    );

    return res.status(200).json(result);
  }

  async findListsByOwner(req: Request, res: Response) {
    const { ownerId } = req.params;
    console.log("[TaskListController]:", ownerId);
    const taskLists = await this.taskListService.findListsByOwnerId(ownerId);

    return res.status(200).json(taskLists);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { ownerId } = req.body;

    const result = await this.taskListService.deleteTaskList(id, ownerId);

    return res.status(200).json(result);
  }

  async share(req: Request, res: Response) {
    const { id } = req.params;
    const { ownerId, usersId } = req.body;

    const result = await this.taskListService.shareTaskList(
      id,
      ownerId,
      usersId
    );

    return res.status(200).json(result);
  }

  async deleteSharing(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { ownerId } = req.body;

    const result = await this.taskListService.deleteSharing(
      id,
      ownerId,
      userId
    );

    return res.status(200).json(result);
  }
}
