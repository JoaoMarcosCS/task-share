import type { Task } from "./task.interface";

export interface FindTaskListDetails {
  taskListId: string;
  ownerId: string;
}

export interface FindTasksFromList {
  tasks: Task[];
  ownerId: string;
}
