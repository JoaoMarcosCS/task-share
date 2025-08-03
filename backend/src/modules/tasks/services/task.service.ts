import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../repository/ITaskRepository";
import { UpdateTaskDTO } from "../dto/update-task.dto";
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
} from "@shared/errors/errors";
import { MessageError } from "@shared/errors/message-error.enum";
import { CreateCommentDTO } from "@modules/comments/dto/create-comment.dto";
import { ICommentRepository } from "@modules/comments/repository/ICommentRepository";
import { Comment } from "@modules/comments/entities/comment.entity";

@injectable()
export class TaskService {
  constructor(
    @inject("ITaskRepository")
    private readonly taskRepository: ITaskRepository,

    @inject("ICommentRepository")
    private readonly commentRepository: ICommentRepository
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

  async createComment(
    taskId: string,
    data: CreateCommentDTO
  ): Promise<boolean> {
    const taskExists = await this.taskRepository.taskBelongsToList(
      taskId,
      data.listId
    );

    if (!taskExists) {
      throw new NotFoundException(MessageError.TASK_NOT_FOUND);
    }

    const result = await this.commentRepository.create(taskId, data);

    if (!result) {
      throw new InternalServerException(MessageError.COMMENT_CREATE_ERROR);
    }

    return true;
  }

  async findCommentsFromTask(taskId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.findCommentsFromTask(taskId);

    if (!comments || comments.length === 0) {
      throw new NotFoundException(MessageError.COMMENTS_NOT_FOUND);
    }

    return comments;
  }
}
