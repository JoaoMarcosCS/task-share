import { api } from "@/service/api";

import type { CreateCommentDTO } from "../schema/create-comment.schema";

const createCommentRequest = async (data: CreateCommentDTO) => {
  const { taskId, ...bodyData } = data;
  const response = await api.post<boolean>(
    `/tasks/${taskId}/comments`,
    bodyData
  );
  console.log("[createCommentRequest]:", response.data);
  return response.data;
};

export { createCommentRequest };
