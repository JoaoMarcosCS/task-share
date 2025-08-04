import { Loader2 } from "lucide-react";
import { useFindTasksListsQuery } from "./hooks/useFindTasksListsQuery";
import { useUserStore } from "@/store/user.store";
import { RenderIf } from "@/components/common/RenderIf";
import { Button } from "@/components/ui/button";
import { RenderItems } from "@/components/common/RenderItems";
import { TaskListCard } from "./components/TaskListCard";

export function Home() {
  const { user } = useUserStore((state) => state);
  const userId = user?.id ?? "";

  const { data: lists, isLoading, error } = useFindTasksListsQuery(userId);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Erro ao carregar listas</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <div>
        <h2 className="font-bold text-2xl tracking-tight sm:text-start text-center">
          Seja bem-vindo(a), {user?.name}
        </h2>
        <p className="text-muted-foreground sm:text-start text-center">
          Acompanhe suas listas de tarefas
        </p>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className=" font-semibold text-2xl sm:text-start text-center">
            Suas Listas de Tarefas
          </h2>
        </div>

        <RenderIf shouldRender={isLoading}>
          <div className="flex gap-4 mt-4">
            <Loader2 className="animate-spin" />
            <span>Carregando suas listas...</span>
          </div>
        </RenderIf>

        <div className="mt-4">
          <RenderIf shouldRender={!isLoading}>
            <RenderItems items={lists} empty={"Nenhuma lista encontrada"}>
              {(taskList) => <TaskListCard taskList={taskList} />}
            </RenderItems>
          </RenderIf>
        </div>
      </div>
    </div>
  );
}
