import { LogOut } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";
import { Button } from "../ui/button";

export const LogoutDialog = () => {
  const { handleLogout } = useLogoutMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          asChild
          variant={"ghost"}
          className="flex min-w-14 flex-col 
        transition-all justify-center py-2 text-sm font-semibold items-center
         rounded-sm hover:text-amber-400"
        >
          <LogOut />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja mesmo encerrar sua sessão?</AlertDialogTitle>
          <AlertDialogDescription>
            Você irá desolgar da sua conta. Caso queira ver suas tarefas, você
            terá que realizar o login novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild className="bg-amber-400 text-white">
            <p>Cancelar</p>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-400 text-white"
            onClick={handleLogout}
          >
            <p>Sair</p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
