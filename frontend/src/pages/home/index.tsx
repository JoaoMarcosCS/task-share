import { Loader2 } from "lucide-react";
import { useFindTasksListsQuery } from "./hooks/useFindTasksListsQuery";
import { useUserStore } from "@/store/user.store";
import { RenderIf } from "@/components/common/RenderIf";
import { Button } from "@/components/ui/button";
import { TaskListCard } from "./components/TaskListCard";
import { Link } from "react-router-dom";

export function Home() {
  const { user } = useUserStore();
  const userId = user?.id ?? "";

  const { data: lists = [], isLoading, error } = useFindTasksListsQuery(userId);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">Erro ao carregar listas</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="mb-8">
        <h2 className="font-bold text-2xl tracking-tight sm:text-start text-center">
          Seja bem-vindo(a), {user?.name}
        </h2>
        <p className="text-muted-foreground sm:text-start text-center">
          Acompanhe suas listas de tarefas
        </p>
      </div>

      <div className="flex-1">
        <RenderIf shouldRender={isLoading}>
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="animate-spin h-8 w-8" />
            <span>Carregando suas listas...</span>
          </div>
        </RenderIf>

        <RenderIf shouldRender={!isLoading}>
          {lists.length === 0 ? (
            <Button asChild variant={"ghost"}>
              <p>
                <Link to="/lists/new">Criar primeira lista</Link>
              </p>
            </Button>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lists.map((taskList) => (
                <TaskListCard key={taskList.id} taskList={taskList} />
              ))}
            </div>
          )}
        </RenderIf>
      </div>
    </div>
  );
}
