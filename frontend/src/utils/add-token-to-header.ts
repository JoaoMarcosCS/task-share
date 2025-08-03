import { api } from "@/services/api";

export const addTokenToHeader = (accessToken: string) => {
  api.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
