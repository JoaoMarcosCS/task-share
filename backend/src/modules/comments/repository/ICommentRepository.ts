import { CreateCommentDTO } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export interface ICommentRepository {
  create(taskId: string, data: CreateCommentDTO): Promise<boolean>;
  findCommentsFromTask(taskId: string): Promise<Comment[]>;
}
