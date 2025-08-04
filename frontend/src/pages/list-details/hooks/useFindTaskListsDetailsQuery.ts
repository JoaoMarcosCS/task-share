import { useQuery } from "@tanstack/react-query";
import { findTaskListDetails } from "../service/find-task-list-details.request";
import type { FindTaskListDetails } from "../interface/find-task-list-details.interface";

export function useFindTaskListsDetailsQuery(data: FindTaskListDetails) {
  const query = useQuery({
    queryFn: () => findTaskListDetails(data),

    queryKey: ["user-list-task", { data }],
    refetchOnWindowFocus: true,
  });

  return query;
}
