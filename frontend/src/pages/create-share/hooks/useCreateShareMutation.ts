import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createShareRequest } from "../service/create-share.requet";
import { getApiMessageError } from "@/utils/get-api-error-message";
import type { AxiosError } from "axios";

export const useCreateShareMutation = (taskListId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShareRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-task-shares"] });
      toast.success("Compartilhamento criado");
      navigate(`/lists/${taskListId}/shares`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });
};
