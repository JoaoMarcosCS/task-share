import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { toggleTaskRequest } from "../service/toogle-task.request";

export const useToggleTaskMutation = (taskListId: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: toggleTaskRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list-task"] });
      toast.success("Tarefa alterada");
      navigate(`/lists/${taskListId}`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
