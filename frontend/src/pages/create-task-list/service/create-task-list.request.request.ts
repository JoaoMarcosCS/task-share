import { api } from "@/service/api";
import type { CreateTaskListDTO } from "../schema/create-task-list.schema";

const createTaskListRequest = async (body: CreateTaskListDTO) => {
  const response = await api.post<boolean>(`/lists`, body);
  console.log("[createTaskListRequest]:", response.data);
  return response.data;
};

export { createTaskListRequest };
