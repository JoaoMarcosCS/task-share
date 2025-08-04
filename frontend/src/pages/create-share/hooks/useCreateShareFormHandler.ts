import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import {
  CreateShareSchema,
  type CreateShareDTO,
} from "../schema/create-share.schema";
import { useCreateShareMutation } from "./useCreateShareMutation";

export const useCreateShareFormHandler = () => {
  const form = useForm<CreateShareDTO>({
    resolver: zodResolver(CreateShareSchema),
  });

  const { listId } = useParams<{ listId: string }>();

  const { mutate, isPending } = useCreateShareMutation(listId!);

  const handleCreateShare = (data: CreateShareDTO) => {
    mutate(data);
  };

  return { form, isPending, handleCreateShare };
};
