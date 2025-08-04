import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteTaskListMutation } from "../hooks/useDeleteTaskListMutation";
import { useEffect } from "react";

interface DeleteListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskListId: string;
  ownerId: string;
}

export function DeleteListModal({
  open,
  onOpenChange,
  taskListId,
  ownerId,
}: DeleteListModalProps) {
  const {
    mutate: deleteList,
    isPending,
    isSuccess,
  } = useDeleteTaskListMutation();

  useEffect(() => {
    if (!isPending && isSuccess) {
      onOpenChange(false);
    }
  }, [isPending, isSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta lista? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            asChild
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            <p>Cancelar</p>
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteList({ ownerId, taskListId })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Confirmar Exclusão
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
