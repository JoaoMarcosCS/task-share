import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../repository/ITaskRepository";
import { UpdateTaskDTO } from "../dto/update-task.dto";
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
} from "@shared/errors/errors";
import { MessageError } from "@shared/errors/message-error.enum";

@injectable()
export class TaskService {
  constructor(
    @inject("ITaskRepository")
    private readonly taskRepository: ITaskRepository
  ) {}

  async update(taskId: string, data: UpdateTaskDTO): Promise<boolean> {
    const result = await this.taskRepository.update(taskId, data);

    if (!result) {
      throw new NotFoundException(MessageError.TASK_NOT_FOUND);
    }

    return true;
  }

  async delete(taskId: string): Promise<boolean> {
    const result = await this.taskRepository.delete(taskId);

    if (!result) {
      throw new NotFoundException(MessageError.TASK_NOT_FOUND);
    }

    return true;
  }

  async toggle(taskId: string): Promise<boolean> {
    const result = await this.taskRepository.toggle(taskId);

    if (!result) {
      throw new NotFoundException(MessageError.TASK_NOT_FOUND);
    }

    return true;
  }
}
