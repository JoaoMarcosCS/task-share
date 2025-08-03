import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getApiMessageError } from "@/utils/get-api-error-message";
import { toast } from "sonner";
import { LoginRequest } from "../service/login.request";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "@/pages/login/interface/token-payload.interface";
import { useUserStore } from "@/store/user.store";
import { addTokenToHeader } from "@/utils/add-token-to-header";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const { updateUser } = useUserStore();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: LoginRequest,

    onSuccess: (data) => {
      const decodedToken = jwtDecode<TokenPayload>(data.accessToken);

      const { name, email, userId } = decodedToken;

      //atualiza o estado do usuário
      updateUser({
        accessToken: data.accessToken,
        email,
        id: userId,
        name,
      });

      //add o token no header de cada requisição
      addTokenToHeader(data.accessToken);

      toast.success("Bem-vindo de volta!");

      navigate("/");
    },
    onError: (error: AxiosError) => {
      toast.error(`${getApiMessageError(error)}`);
    },
  });

  return mutate;
};
