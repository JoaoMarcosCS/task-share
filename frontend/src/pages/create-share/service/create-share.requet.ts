import { api } from "@/service/api";
import type { CreateShareDTO } from "../schema/create-share.schema";

export const createShareRequest = async (data: CreateShareDTO) => {
  const { taskListId, ...bodyData } = data;
  const response = await api.post(`/lists/${taskListId}/share`, bodyData);
  return response.data;
};
