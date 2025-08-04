import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { deleteTaskRequest } from "../service/delete-task.request";

export const useDeleteTaskMutation = (taskListId: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteTaskRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list-task"] });
      toast.success("Tarefa excluida");
      navigate(`/lists/${taskListId}`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
