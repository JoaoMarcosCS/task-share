import { useUserStore } from "@/store/user.store";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { user } = useUserStore.getState();
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});
