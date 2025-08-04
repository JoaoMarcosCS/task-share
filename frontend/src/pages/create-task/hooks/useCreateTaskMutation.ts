import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskRequest } from "../service/create-task.request";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateTaskMutation = (taskListId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list-task"] });
      toast.success("Tarefa criada com sucesso!");
      navigate(`/lists/${taskListId}`);
    },
    onError: (error) => {
      toast.error("Erro ao criar tarefa");
      console.error("Create task error:", error);
    },
  });
};
