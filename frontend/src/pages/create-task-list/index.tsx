import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateTaskListFormHandler } from "./hooks/useCreateTaskListFormHandler";
import { useEffect } from "react";

export function CreateTaskList() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { form, handleCreateUser, isPending } = useCreateTaskListFormHandler();

  useEffect(() => {
    form.setValue("ownerId", user?.id || "");
  });

  return (
    <div className="mx-auto p-4 max-w-md md:ml-0 md:mr-auto">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Lista</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateUser)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Lista</FormLabel>
                <FormControl>
                  <Input placeholder="Desenvolver o frontend" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-end">
            <Button asChild variant={"default"} onClick={() => navigate(-1)}>
              <p>Cancelar</p>
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isPending ? "Criando..." : "Criar Lista"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
