import { useQuery } from "@tanstack/react-query";
import type { FindShareDTO } from "../interface/find-share.interface";
import { findSharesRequest } from "../service/find-shares.request";

export function useFindShareQuery(data: FindShareDTO) {
  const query = useQuery({
    queryFn: () => findSharesRequest(data),

    queryKey: ["list-task-shares", { data }],
    refetchOnWindowFocus: true,
  });

  return query;
}
