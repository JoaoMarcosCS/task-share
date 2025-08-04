import { api } from "@/service/api";
import type { ToggleTask } from "../interface/toggle-task.interface";

export const toggleTaskRequest = async (data: ToggleTask) => {
  const { taskId, ...bodyData } = data;
  const response = await api.patch(`/tasks/${taskId}/toggle`, bodyData);
  return response.data;
};
