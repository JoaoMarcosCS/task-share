import { api } from "@/service/api";
import type { FindTaskComment } from "../interface/find-task-comments.interface";
import type { Comments } from "../interface/comment.interface";

const findTaskCommentsRequest = async (data: FindTaskComment) => {
  const response = await api.get<Comments[]>(
    `/tasks/${data.taskId}/comments?ownerId=${data.ownerId}&listId=${data.listId}`
  );
  console.log("[findTaskCommentsRequest]:", response.data);
  return response.data;
};

export { findTaskCommentsRequest };
