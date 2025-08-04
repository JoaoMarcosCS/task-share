import { api } from "@/service/api";

export const removeTokenFromHeader = () => {
  delete api.defaults.headers.Authorization;
};
