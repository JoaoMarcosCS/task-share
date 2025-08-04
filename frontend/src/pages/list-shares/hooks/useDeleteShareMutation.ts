import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getApiMessageError } from "@/utils/get-api-error-message";
import type { AxiosError } from "axios";
import { deleteShareRequest } from "../service/delete-share.request";

export const useDeleteShareMutation = (taskListId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShareRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-task-shares"] });
      toast.success("Compartilhamento excluido");
      navigate(`/lists/${taskListId}/shares`);
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });
};
