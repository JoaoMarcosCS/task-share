import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Task } from "../interface/task.interface";

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newTitle: string) => Promise<void>;
  isLoading: boolean;
}

export function EditTaskModal({
  task,
  isOpen,
  onOpenChange,
  onSave,
  isLoading,
}: EditTaskModalProps) {
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = async () => {
    await onSave(newTitle);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button asChild variant="outline" onClick={() => onOpenChange(false)}>
            <p>Cancelar</p>
          </Button>
          <Button asChild onClick={handleSave} disabled={isLoading}>
            <p>{isLoading ? "Salvando..." : "Salvar"}</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
