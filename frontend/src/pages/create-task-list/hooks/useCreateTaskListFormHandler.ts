import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTaskListSchema,
  type CreateTaskListDTO,
} from "../schema/create-task-list.schema";
import { useCreateTaskListMutation } from "./useCreateTaskListMutatio";

export const useCreateTaskListFormHandler = () => {
  const form = useForm<CreateTaskListDTO>({
    resolver: zodResolver(CreateTaskListSchema),
  });

  const { mutate, isPending } = useCreateTaskListMutation();

  const handleCreateUser = (data: CreateTaskListDTO) => {
    mutate(data);
  };

  return {
    form,
    handleCreateUser,
    isPending,
  };
};
