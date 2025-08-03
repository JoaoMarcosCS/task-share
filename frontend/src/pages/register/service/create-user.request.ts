import { api } from "@/services/api";
import type { CreateUserDTO } from "../schema/create-user.schema";

const createUserRequest = async (body: CreateUserDTO) => {
  const response = await api.post<boolean>(`/users`, body);

  return response.data;
};

export { createUserRequest };
