import { CreateTaskListDTO } from "../dto/create-task-list.dto";
import { UpdateTaskListDTO } from "../dto/update-task-list.dto";
import { TaskList } from "../entities/task-list.entity";

export interface ITaskListRepository {
  create(data: CreateTaskListDTO): Promise<boolean>;
  findListsByOwnerId(ownerId: string): Promise<TaskList[]>;
  update(id: string, data: UpdateTaskListDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  share(listId: string, usersId: string[]): Promise<boolean>;
  deleteSharing(listId: string, userId: string): Promise<boolean>;
  isOwner(userId: string, taskListId: string): Promise<boolean>;
  sharingAlreadyExists(listId: string, usersId: string[]): Promise<string[]>;
}
