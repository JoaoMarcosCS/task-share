import { api } from "@/service/api";
import type { CreateTaskDTO } from "../schema/create-task.schema";

export const createTaskRequest = async (data: CreateTaskDTO) => {
  const { taskListId, ...bodyData } = data;
  const response = await api.post(`/lists/${taskListId}/tasks`, bodyData);
  return response.data;
};
