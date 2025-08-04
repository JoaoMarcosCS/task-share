import { useQuery } from "@tanstack/react-query";
import { findUserByEmailRequest } from "../service/find-user-by-email.request";

export function useFindUserByEmailQuery({ email }: { email: string }) {
  const query = useQuery({
    queryFn: () => findUserByEmailRequest({ email }),
    queryKey: ["user-data", { email }],
  });

  return query;
}
