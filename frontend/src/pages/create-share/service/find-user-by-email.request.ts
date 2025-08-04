import { api } from "@/service/api";
import type { User } from "../interface/user.interface";

const findUserByEmailRequest = async ({ email }: { email: string }) => {
  const response = await api.get<User[]>(`/users/by-email?email=${email}`);

  return response.data;
};

export { findUserByEmailRequest };
