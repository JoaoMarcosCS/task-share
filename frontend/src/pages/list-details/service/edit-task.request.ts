import { api } from "@/service/api";
import type { EditTask } from "../interface/edit-task.interface";

export const editTaskRequest = async (data: EditTask) => {
  const { taskId, ...bodyData } = data;
  const response = await api.put(`/tasks/${taskId}`, bodyData);
  return response.data;
};
