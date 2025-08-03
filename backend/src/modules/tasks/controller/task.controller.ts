import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TaskService } from "../services/task.service";
import { validateWithZod } from "@shared/utils/validate-with-zod";
import { UpdateTaskSchema } from "../dto/update-task.dto";

@injectable()
export class TaskController {
  constructor(
    @inject("TaskService")
    private taskService: TaskService
  ) {}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const safeData = validateWithZod(UpdateTaskSchema, req.body);

    const result = await this.taskService.update(id, safeData);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    console.log("[TaskController]", id);
    const result = await this.taskService.delete(id);

    return res.status(200).json(result);
  }

  async toggle(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.taskService.toggle(id);

    return res.status(200).json(result);
  }
}
