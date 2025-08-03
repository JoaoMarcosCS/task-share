import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginDTO } from "../schema/login.schema";
import { useLoginMutation } from "./useLoginMutation";
export const useLoginFormHandler = () => {
  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();

  const handleCreateUser = (data: LoginDTO) => {
    mutate(data);
  };

  return {
    form,
    handleCreateUser,
    isPending,
  };
};
