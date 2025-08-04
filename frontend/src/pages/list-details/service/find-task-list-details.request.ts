import { api } from "@/service/api";
import type {
  FindTaskListDetails,
  FindTasksFromList,
} from "../interface/find-task-list-details.interface";

const findTaskListDetails = async (data: FindTaskListDetails) => {
  const response = await api.get<FindTasksFromList>(
    `/lists/${data.taskListId}/tasks?ownerId=${data.ownerId}`
  );
  console.log("[findTaskListDetails]:", response.data);
  return response.data;
};

export { findTaskListDetails };
