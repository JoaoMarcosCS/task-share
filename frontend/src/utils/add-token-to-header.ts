import { api } from "@/service/api";

export const addTokenToHeader = (accessToken: string) => {
  api.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
