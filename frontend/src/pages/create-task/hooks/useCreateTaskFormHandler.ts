import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTaskSchema,
  type CreateTaskDTO,
} from "../schema/create-task.schema";
import { useCreateTaskMutation } from "./useCreateTaskMutation";
import { useParams } from "react-router-dom";

export const useCreateTaskFormHandler = () => {
  const form = useForm<CreateTaskDTO>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { listId } = useParams<{ listId: string }>();

  const { mutate, isPending } = useCreateTaskMutation(listId!);

  const handleCreateTask = (data: CreateTaskDTO) => {
    mutate(data);
  };

  return { form, isPending, handleCreateTask };
};
