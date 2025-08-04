import { api } from "@/service/api";
import type { FindShareDTO } from "../interface/find-share.interface";
import type { Share } from "../interface/share.interface";

const findSharesRequest = async (data: FindShareDTO) => {
  const response = await api.get<Share[]>(
    `/lists/${data.taskListId}/share?ownerId=${data.ownerId}`
  );
  console.log("[findSharesRequestttt]:", response.data);
  return response.data;
};

export { findSharesRequest };
