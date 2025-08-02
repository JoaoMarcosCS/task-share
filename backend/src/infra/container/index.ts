import { ITaskListRepository } from "@modules/tasks-lists/repository/ITaskListRepository";
import { TaskListRepository } from "@modules/tasks-lists/repository/task-list.repository";
import { TaskListService } from "@modules/tasks-lists/services/task-list.service";
import { IUserRepository } from "@modules/users/repository/IUserRepository";
import { UserRepository } from "@modules/users/repository/user.repository";
import { UserService } from "@modules/users/services/user.service";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

container.registerSingleton("UserService", UserService);

container.registerSingleton<ITaskListRepository>(
  "ITaskListRepository",
  TaskListRepository
);

container.registerSingleton("TaskListService", TaskListService);
