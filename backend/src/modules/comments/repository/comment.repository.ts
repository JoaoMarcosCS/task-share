import { injectable } from "tsyringe";
import { ICommentRepository } from "./ICommentRepository";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { AppDataSource } from "@infra/database/data-source";
import { Comment } from "../entities/comment.entity";

@injectable()
export class CommentRepository implements ICommentRepository {
  private readonly commentRepository = AppDataSource.getRepository(Comment);

  async create(taskId: string, data: CreateCommentDTO): Promise<boolean> {
    const comment = this.commentRepository.create({
      content: data.content,
      user: { id: data.ownerId },
      task: { id: taskId },
    });
    console.log("[CommentRepository]:", comment);

    const result = await this.commentRepository.save(comment);
    return !!result;
  }

  async findCommentsFromTask(taskId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: ["user"],
      select: {
        content: true,
        user: {
          name: true,
        },
        createdAt: true,
      },
      order: {
        createdAt: "desc",
      },
    });

    return comments;
  }
}
