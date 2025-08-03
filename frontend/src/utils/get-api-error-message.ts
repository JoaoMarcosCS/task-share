import { AxiosError } from "axios";

interface ApiErrorResponse {
  error: {
    message: string;
    error: string;
    statusCode: number;
  };
}

export const getApiMessageError = (error: AxiosError): string => {
  const messageError = error.response?.data as ApiErrorResponse;
  console.log("[getErrorApi]:", messageError);
  return messageError?.error.message ?? "Erro no servidor";
};
