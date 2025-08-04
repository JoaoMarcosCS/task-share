import { api } from "@/service/api";
import type { LoginDTO } from "../schema/login.schema";

interface LoginResponse {
  accessToken: string;
}

const LoginRequest = async (body: LoginDTO) => {
  const response = await api.post<LoginResponse>(`/auth/login`, body);
  console.log("[loginRequest]:", response.data);
  return response.data;
};

export { LoginRequest };
