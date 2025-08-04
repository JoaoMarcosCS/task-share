import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { deleteTaskListRequest } from "../service/delete-task-list.request";

export const useDeleteTaskListMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteTaskListRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-lists"] });
      toast.success("Lista excluida");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
