import { api } from "@/service/api";
import type { CreateUserDTO } from "../schema/create-user.schema";

const createUserRequest = async (body: CreateUserDTO) => {
  const response = await api.post<boolean>(`/lists`, body);

  return response.data;
};

export { createUserRequest };
