import { useQuery } from "@tanstack/react-query";
import { findTasksListsRequest } from "../service/find-tasks-lists.request";

export function useFindTasksListsQuery(userId: string) {
  const query = useQuery({
    queryFn: () => findTasksListsRequest(userId),

    queryKey: ["user-lists", { userId }],
    refetchOnWindowFocus: true,
    
  });

  return query;
}
