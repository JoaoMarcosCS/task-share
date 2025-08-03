import { CreateTaskListDTO } from "../dto/create-task-list.dto";
import { UpdateTaskListDTO } from "../dto/update-task-list.dto";
import { TaskList } from "../entities/task-list.entity";
import { ITaskListRepository } from "../repository/ITaskListRepository";
import { inject, injectable } from "tsyringe";
import { MessageError } from "@shared/errors/message-error.enum";
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "@shared/errors/errors";
import { CreateTaskDTO } from "@modules/tasks/dto/create-task.dto";

@injectable()
export class TaskListService {
  constructor(
    @inject("ITaskListRepository")
    private readonly taskListRepository: ITaskListRepository
  ) {}

  async createTaskList(data: CreateTaskListDTO): Promise<boolean> {
    const result = await this.taskListRepository.create(data);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_CREATE_ERROR);
    }

    return true;
  }

  async updateTaskList(
    listId: string,
    ownerId: string,
    data: UpdateTaskListDTO
  ): Promise<boolean> {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    const result = await this.taskListRepository.update(listId, data);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_UPDATE_ERROR);
    }

    return true;
  }

  async findListsByOwnerId(ownerId: string): Promise<TaskList[]> {
    const result = await this.taskListRepository.findListsByOwnerId(ownerId);

    if (!result || result.length === 0) {
      throw new NotFoundException(MessageError.TASK_LIST_NOT_FOUND);
    }

    return result;
  }

  async deleteTaskList(listId: string, ownerId: string): Promise<boolean> {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    const result = await this.taskListRepository.delete(listId);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_DELETE_ERROR);
    }

    return true;
  }

  async shareTaskList(
    listId: string,
    ownerId: string,
    usersId: string[]
  ): Promise<boolean> {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    usersId = usersId.filter((userId) => userId !== ownerId);

    if (usersId.length === 0) {
      throw new ConflictException(MessageError.SHARE_WITH_OWNER);
    }

    const newUsersId = await this.taskListRepository.sharingAlreadyExists(
      listId,
      usersId
    );

    if (newUsersId.length == 0) {
      throw new ConflictException(MessageError.SHARING_ALREDY_EXISTS);
    }

    const result = await this.taskListRepository.share(listId, newUsersId);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_UPDATE_ERROR);
    }

    return true;
  }

  async deleteSharing(
    listId: string,
    ownerId: string,
    userId: string
  ): Promise<boolean> {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    const result = await this.taskListRepository.deleteSharing(listId, userId);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_UPDATE_ERROR);
    }

    return true;
  }

  async findTaskFromList(ownerId: string, listId: string) {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    const result = await this.taskListRepository.findTasksFromList(listId);

    if (!result || result.length === 0) {
      throw new NotFoundException(MessageError.TASK_NOT_FOUND);
    }

    return result;
  }

  async assignTask(ownerId: string, listId: string, data: CreateTaskDTO) {
    const isOwner = await this.taskListRepository.isOwner(ownerId, listId);

    if (!isOwner) {
      throw new UnauthorizedException(MessageError.TASK_LIST_NOT_OWNER);
    }

    const result = await this.taskListRepository.assignTask(listId, data);

    if (!result) {
      throw new InternalServerException(MessageError.TASK_LIST_CREATE_ERROR);
    }

    return true;
  }
}
