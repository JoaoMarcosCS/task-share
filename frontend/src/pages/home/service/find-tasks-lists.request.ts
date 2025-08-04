import { api } from "@/service/api";
import type { TaskList } from "../interface/task-list.interface";

const findTasksListsRequest = async (userId: string) => {
  const response = await api.get<TaskList[]>(`/lists/${userId}`);
  console.log("[findTasksListsRequest]:", response.data);
  return response.data;
};

export { findTasksListsRequest };
