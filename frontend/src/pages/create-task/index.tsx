import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCreateTaskFormHandler } from "./hooks/useCreateTaskFormHandler";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";

export function CreateTask() {
  const { listId } = useParams<{ listId: string }>();
  const { form, isPending, handleCreateTask } = useCreateTaskFormHandler();
  const { user } = useUserStore();

  useEffect(() => {
    form.setValue("completed", false);
    form.setValue("ownerId", user?.id || "");
    form.setValue("taskListId", listId || "");
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="outline" size="icon">
          <Link to={`/lists/${listId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Nova Tarefa</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateTask)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Desenvolver feature X" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              asChild
              type="button"
              variant="outline"
              onClick={() => history.back()}
            >
              <p>Cancelar</p>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Criando..." : "Criar Tarefa"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
