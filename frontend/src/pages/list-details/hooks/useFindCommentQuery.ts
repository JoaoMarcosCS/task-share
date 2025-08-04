import { useQuery } from "@tanstack/react-query";
import type { FindTaskComment } from "../interface/find-task-comments.interface";
import { findTaskCommentsRequest } from "../service/find-task-comments.request";

export function useFindTaskCommentQuery(data: FindTaskComment) {
  const query = useQuery({
    queryFn: () => findTaskCommentsRequest(data),

    queryKey: ["user-task-comment", { data }],
    refetchOnWindowFocus: true,
  });

  return query;
}
