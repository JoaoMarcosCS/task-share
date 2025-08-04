import { Calendar, User, Edit, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUserStore } from "@/store/user.store";
import { RenderIf } from "@/components/common/RenderIf";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { TaskList } from "@/pages/home/interface/task-list.interface";

export interface TaskListProps {
  taskList: TaskList;
}

export function TaskListCard({ taskList }: TaskListProps) {
  const { user } = useUserStore();
  const isOwner = user?.id === taskList.owner.id;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-2 w-full sm:w-64">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg truncate">{taskList.title}</h3>

        <RenderIf shouldRender={!isOwner}>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            Compartilhada
          </span>
        </RenderIf>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span>{isOwner ? "Você" : taskList.owner.name}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
        <Calendar className="h-4 w-4" />
        <span>
          {format(new Date(taskList.createdAt), "dd MMM yyyy", {
            locale: ptBR,
          })}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
          <Link to={`/lists/${taskList.id}`}>
            <Eye className="h-4 w-4" />
            Visualizar
          </Link>
        </Button>

        <RenderIf shouldRender={isOwner}>
          <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
            <Link to={`/lists/${taskList.id}/edit`}>
              <Edit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
        </RenderIf>
      </div>
    </div>
  );
}
