/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { useFindTaskListsDetailsQuery } from "./hooks/useFindTaskListsDetailsQuery";
import { Loader2, Plus, Share2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TaskCard } from "./components/TaskCard";

export function TaskListDetails() {
  const { listId } = useParams<{ listId: string }>();
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (!listId || !user?.id) {
    navigate("/");
    return null;
  }

  const { data, isLoading, error } = useFindTaskListsDetailsQuery({
    taskListId: listId,
    ownerId: user.id,
  });

  useEffect(() => {
    if (error) {
      console.error("[TaskListDetailsPage]:", error);
      toast.error("Erro ao carregar lista de tarefas");
      navigate("/");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }
  const isOwner = data?.ownerId === user.id;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start gap-8 items-center mb-6">
        <h1 className="text-2xl font-bold">Tarefas</h1>

        {isOwner && (
          <Button asChild variant={"outline"}>
            <Link to={`/lists/${listId}/tasks/new`}>
              <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
            </Link>
          </Button>
        )}

        {isOwner && (
          <Button asChild variant={"outline"}>
            <Link to={`/lists/${listId}/shares`}>
              <Share2 className="mr-2 h-4 w-4" /> Compartilhamentos
            </Link>
          </Button>
        )}
      </div>

      {data?.tasks.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">Nenhuma tarefa criada ainda</p>
          {isOwner && (
            <Button asChild variant={"link"}>
              <Link to={`/lists/${listId}/tasks/new`}>
                Criar primeira tarefa
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
