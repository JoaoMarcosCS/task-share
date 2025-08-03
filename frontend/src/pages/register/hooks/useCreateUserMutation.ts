import { useMutation } from "@tanstack/react-query";
import { createUserRequest } from "../service/create-user.request";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateUserMutation = () => {
  const navigate = useNavigate();
  const mutate = useMutation({
    mutationFn: createUserRequest,

    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
