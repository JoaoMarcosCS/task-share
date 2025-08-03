import { api } from "@/services/api";

export const removeTokenFromHeader = () => {
  delete api.defaults.headers.Authorization;
};
