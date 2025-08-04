import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createTaskListRequest } from "../service/create-task-list.request.request";

export const useCreateTaskListMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createTaskListRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-lists"] });
      toast.success("Lista criada com sucesso!");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
