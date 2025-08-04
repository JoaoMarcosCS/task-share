import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { createCommentRequest } from "../service/create-comment.request";

export const useCreateCommentMutation = (taskListId: string) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createCommentRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-task-comment"] });
      toast.success("Comentário criado");
      navigate(`/lists/${taskListId}`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
