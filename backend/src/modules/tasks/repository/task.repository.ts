import { injectable } from "tsyringe";
import { ITaskRepository } from "./ITaskRepository";
import { UpdateTaskDTO } from "../dto/update-task.dto";
import { AppDataSource } from "@infra/database/data-source";
import { Task } from "../entities/task.entity";

@injectable()
export class TaskRepository implements ITaskRepository {
  private readonly taskRepository = AppDataSource.getRepository(Task);

  async update(taskId: string, data: UpdateTaskDTO): Promise<boolean> {
    console.log("[TaskRepository]", data);

    const { ownerId, listId, ...updateData } = data;

    const result = await this.taskRepository.update(taskId, updateData);

    return result.affected > 0;
  }

  async delete(taskId: string): Promise<boolean> {
    const result = await this.taskRepository.delete(taskId);
    return result.affected > 0;
  }

  async toggle(taskId: string): Promise<boolean> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      select: {
        completed: true,
      },
    });

    if (!task) {
      return false;
    }

    const result = await this.taskRepository.update(taskId, {
      completed: !task.completed,
    });

    return result.affected > 0;
  }

  async taskBelongsToList(taskId: string, listId: string): Promise<boolean> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        list: { id: listId },
      },
    });
    return !!task;
  }
}
