import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Check,
  Clock,
  Calendar,
  Trash2,
  Edit,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Task } from "../interface/task.interface";
import { useState } from "react";
import { useDeleteTaskMutation } from "../hooks/useDeleteTaskMutation";
import { useEditTaskMutation } from "../hooks/useEditTaskMutation";
import { useToggleTaskMutation } from "../hooks/useToggleTaskMutation";
import { EditTaskModal } from "./EditTaskModal";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { RenderIf } from "@/components/common/RenderIf";
import { CommentsModal } from "./CommentModal";

interface TaskCardProps {
  task: Task;
  onEditSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function TaskCard({ task }: TaskCardProps) {
  const createdAt = new Date(task.createdAt);
  const updatedAt = new Date(task.updatedAt);
  const wasUpdated = updatedAt > createdAt;
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  const listId = task.list.id;
  const isOwner = user?.id === task.list.owner.id;

  const { mutateAsync: deleteTask, isPending: isDeleting } =
    useDeleteTaskMutation(listId);
  const { mutateAsync: toggleTask, isPending: isToggling } =
    useToggleTaskMutation(listId);
  const { mutateAsync: editTask, isPending: isEditing } =
    useEditTaskMutation(listId);

  const handleToggleComplete = async () => {
    if (!user?.id) return navigate(`/`);
    await toggleTask({
      taskId: task.id,
      listId,
      ownerId: user.id,
    });
  };

  const handleEdit = async (newTitle: string) => {
    if (!user?.id) return navigate(`/`);
    await editTask({
      listId,
      taskId: task.id,
      title: newTitle,
      ownerId: user.id,
    });
  };

  const handleDelete = async () => {
    if (!user?.id) return navigate(`/`);
    await deleteTask({
      listId,
      taskId: task.id,
      ownerId: user.id,
    });
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-4 hover:shadow-md transition-shadow",
        task.completed ? "bg-green-50 border-green-200" : "bg-white"
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-lg">{task.title}</h3>

        <div className="flex items-center gap-1">
          {task.completed ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-500" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>
          {wasUpdated ? "Atualizado" : "Criado"} em{" "}
          {format(
            wasUpdated ? updatedAt : createdAt,
            "dd MMM yyyy 'às' HH:mm",
            { locale: ptBR }
          )}
        </span>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <RenderIf shouldRender={isOwner}>
          <Button
            variant={task.completed ? "outline" : "default"}
            size="sm"
            className={cn(
              task.completed
                ? "border-green-600 text-green-600 hover:bg-green-50"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
            onClick={handleToggleComplete}
            disabled={isToggling}
          >
            {isToggling
              ? "Processando..."
              : task.completed
              ? "Desmarcar como concluída"
              : "Marcar como concluída"}
          </Button>
        </RenderIf>

        <RenderIf shouldRender={isOwner}>
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={() => setIsCommentsModalOpen(true)}
          >
            <p>
              {" "}
              <MessageSquare className="h-4 w-4 mr-2" />
              Comentários
            </p>
          </Button>
        </RenderIf>

        <RenderIf shouldRender={isOwner}>
          <Button
            asChild
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            disabled={isEditing}
          >
            <p>
              {" "}
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Editando..." : "Editar"}
            </p>
          </Button>
        </RenderIf>

        <RenderIf shouldRender={isOwner}>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
          >
            <p>
              <Trash2 className="h-4 w-4" />
            </p>
          </Button>
        </RenderIf>
      </div>

      <EditTaskModal
        task={task}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSave={handleEdit}
        isLoading={isEditing}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

      <CommentsModal
        taskId={task.id}
        listId={listId}
        isOpen={isCommentsModalOpen}
        onOpenChange={setIsCommentsModalOpen}
      />
    </div>
  );
}
