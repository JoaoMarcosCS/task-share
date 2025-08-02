import { injectable } from "tsyringe";
import { AppDataSource } from "../../../infra/database/data-source";
import { CreateTaskListDTO } from "../dto/create-task-list.dto";
import { UpdateTaskListDTO } from "../dto/update-task-list.dto";
import { TaskList } from "../entities/task-list.entity";
import { ITaskListRepository } from "./ITaskListRepository";
import { ListShare } from "../entities/list-share.entity";
import { In } from "typeorm";

@injectable()
export class TaskListRepository implements ITaskListRepository {
  private readonly taskListRepository = AppDataSource.getRepository(TaskList);
  private readonly listShareRepository = AppDataSource.getRepository(ListShare);

  async create(data: CreateTaskListDTO): Promise<boolean> {
    const taskList = this.taskListRepository.create({
      title: data.title,
      owner: { id: data.ownerId },
    });
    console.log("[TaskListRespository]:", taskList);
    const result = await this.taskListRepository.save(taskList);
    return !!result;
  }

  async findListsByOwnerId(ownerId: string): Promise<TaskList[]> {
    const ownedLists = await this.taskListRepository.find({
      where: {
        owner: { id: ownerId },
      },
      relations: ["owner"],
      order: { createdAt: "DESC" },
      select: {
        title: true,
        owner: {
          name: true,
          email: true,
          id: true,
        },
        createdAt: true,
        updatedAt: true,
        id: true,
      },
    });

    const sharedLists = await this.listShareRepository.find({
      where: {
        user: { id: ownerId },
      },
      relations: ["taskList", "taskList.owner"],
      select: {
        createdAt: true,
        taskList: {
          title: true,
          owner: {
            name: true,
            email: true,
            id: true,
          },
          createdAt: true,
          updatedAt: true,
          id: true,
        },
        user: {
          id: true,
        },
      },
    });

    console.log("[findListsByOwnerId]: listas compartilhadas", sharedLists);

    const sharedTaskLists = sharedLists.map((share) => share.taskList);

    const allLists = [...ownedLists, ...sharedTaskLists];

    const uniqueLists = allLists.filter(
      (list, index, self) => index === self.findIndex((l) => l.id === list.id)
    );

    console.log(
      "[findListsByOwnerId]: listas compartilhadas + próprieas",
      uniqueLists
    );

    uniqueLists.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return uniqueLists;
  }
  async update(id: string, data: UpdateTaskListDTO): Promise<boolean> {
    const { ownerId, ...updateData } = data;

    const result = await this.taskListRepository.update(id, updateData);
    return result.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskListRepository.delete(id);
    return result.affected > 0;
  }

  async share(listId: string, usersId: string[]): Promise<boolean> {
    const shares = usersId.map((userId) => {
      return this.listShareRepository.create({
        taskList: { id: listId },
        user: { id: userId },
      });
    });

    const result = await this.listShareRepository.save(shares);

    return !!result;
  }

  async deleteSharing(listId: string, userId: string): Promise<boolean> {
    const result = await this.listShareRepository.delete({
      taskList: { id: listId },
      user: { id: userId },
    });

    return result.affected > 0;
  }

  async isOwner(userId: string, taskListId: string): Promise<boolean> {
    const existOwner = await this.taskListRepository.findOne({
      where: {
        id: taskListId,
        owner: {
          id: userId,
        },
      },
    });

    if (!existOwner) return false;
    return true;
  }

  async sharingAlreadyExists(
    listId: string,
    usersId: string[]
  ): Promise<string[]> {
    const existingShares = await this.listShareRepository.find({
      where: {
        taskList: { id: listId },
        user: { id: In(usersId) },
      },
      select: {
        user: {
          id: true,
        },
      },
      relations: ["user"],
    });

    console.log("[sharing]", existingShares);

    const existingUserIds = existingShares.map((share) => share.user.id);

    const newUsersId = usersId.filter(
      (userId) => !existingUserIds.includes(userId)
    );

    //se ainda tem userId que não foi compartilhado
    if (newUsersId.length > 0) {
      return newUsersId;
    }

    //se não existe usuário que ainda não foi compartilhado
    return [];
  }
}
