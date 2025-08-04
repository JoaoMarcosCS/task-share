import { api } from "@/service/api";

const deleteTaskListRequest = async ({
  taskListId,
  ownerId,
}: {
  taskListId: string;
  ownerId: string;
}) => {
  const response = await api.delete<boolean>(`/lists/${taskListId}`, {
    data: { ownerId },
  });

  return response.data;
};

export { deleteTaskListRequest };
