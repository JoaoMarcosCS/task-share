import { Calendar, User, Edit, Eye, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TaskList } from "../interface/task-list.interface";
import { useUserStore } from "@/store/user.store";
import { RenderIf } from "@/components/common/RenderIf";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteListModal } from "./DeleteListModal";

export interface TaskListProps {
  taskList: TaskList;
}

export function TaskListCard({ taskList }: TaskListProps) {
  const { user } = useUserStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const isOwner = user?.id === taskList.owner.id;
  const createdAt = new Date(taskList.createdAt);
  const updatedAt = new Date(taskList.updatedAt);
  const wasUpdated = updatedAt > createdAt;

  return (
    <>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col gap-2 w-full sm:w-64">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg truncate">{taskList.title}</h3>

          <div className="flex gap-2">
            <RenderIf shouldRender={!isOwner}>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Compartilhada
              </span>
            </RenderIf>

            <RenderIf shouldRender={isOwner}>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:bg-red-50"
                onClick={() => setDeleteModalOpen(true)}
              >
                <p>
                  <Trash2 className="h-4 w-4" />
                </p>
              </Button>
            </RenderIf>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{isOwner ? "Você" : taskList.owner.name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {wasUpdated ? (
            <>
              <RefreshCw className="h-4 w-4" />
              <span>
                Atualizado em{" "}
                {format(updatedAt, "dd MMM yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </span>
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4" />
              <span>
                Criado em{" "}
                {format(createdAt, "dd MMM yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
            <Link to={`/lists/${taskList.id}`}>
              <Eye className="h-4 w-4" />
              Visualizar
            </Link>
          </Button>

          <RenderIf shouldRender={isOwner}>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
            >
              <Link to={`/lists/${taskList.id}/edit`}>
                <Edit className="h-4 w-4" />
                Editar
              </Link>
            </Button>
          </RenderIf>
        </div>
      </div>

      <DeleteListModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        taskListId={taskList.id}
        ownerId={taskList.owner.id}
      />
    </>
  );
}
