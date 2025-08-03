import { useForm } from "react-hook-form";
import {
  CreateUserSchema,
  type CreateUserDTO,
} from "../schema/create-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserMutation } from "./useCreateUserMutation";

export const useCreateUserFormHandler = () => {
  const form = useForm<CreateUserDTO>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useCreateUserMutation();

  const handleCreateUser = (data: CreateUserDTO) => {
    mutate(data);
  };

  return {
    form,
    handleCreateUser,
    isPending,
  };
};
