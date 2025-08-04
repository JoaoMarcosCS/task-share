import { api } from "@/service/api";
import type { DeleteTask } from "../interface/delete-task.interface";

export const deleteTaskRequest = async (data: DeleteTask) => {
  const { taskId, ...bodyData } = data;
  const response = await api.delete(`/tasks/${taskId}`, { data: bodyData });
  return response.data;
};
