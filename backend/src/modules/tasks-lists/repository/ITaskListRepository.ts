import { CreateTaskDTO } from "@modules/tasks/dto/create-task.dto";
import { Task } from "../../../modules/tasks/entities/task.entity";
import { CreateTaskListDTO } from "../dto/create-task-list.dto";
import { UpdateTaskListDTO } from "../dto/update-task-list.dto";
import { TaskList } from "../entities/task-list.entity";

export interface ITaskListRepository {
  create(data: CreateTaskListDTO): Promise<boolean>;
  findListsByOwnerId(ownerId: string): Promise<TaskList[]>;
  update(listId: string, data: UpdateTaskListDTO): Promise<boolean>;
  delete(listId: string): Promise<boolean>;
  share(listId: string, usersId: string[]): Promise<boolean>;
  deleteSharing(listId: string, userId: string): Promise<boolean>;
  isOwner(userId: string, taskListId: string): Promise<boolean>;
  sharingAlreadyExists(listId: string, usersId: string[]): Promise<string[]>;
  findTasksFromList(listId: string): Promise<Task[]>;
  assignTask(listId: string, data: CreateTaskDTO): Promise<boolean>;
}
