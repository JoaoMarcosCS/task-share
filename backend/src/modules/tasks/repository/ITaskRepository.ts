import { UpdateTaskDTO } from "../dto/update-task.dto";

export interface ITaskRepository {
  update(taskId: string, data: UpdateTaskDTO): Promise<boolean>;
  delete(taskId: string): Promise<boolean>;
  toggle(taskId: string): Promise<boolean>;
  taskBelongsToList(taskId: string, listId: string): Promise<boolean>;
}
