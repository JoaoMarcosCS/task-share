import { api } from "@/service/api";

import type { DeleteShare } from "../interface/delete-share.interface";

export const deleteShareRequest = async (data: DeleteShare) => {
  const { listId, userId, ...bodyData } = data;
  const response = await api.delete(`/lists/${listId}/share/${userId}`, {
    data: bodyData,
  });
  return response.data;
};
