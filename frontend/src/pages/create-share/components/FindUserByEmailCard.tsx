import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFindUserByEmailQuery } from "../hooks/useFindUserByEmailQuery";
import { useCreateShareMutation } from "../hooks/useCreateShareMutation";
import { RenderIf } from "@/components/common/RenderIf";
import { Loader2, Check, X } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { Badge } from "@/components/ui/badge";

export const FindUserByEmailCard = ({ listId }: { listId: string }) => {
  const [email, setEmail] = useState("");
  const [typing, setIsTyping] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<
    Array<{ id: string; email: string; name: string }>
  >([]);
  const ownerId = useUserStore((state) => state.user?.id);

  const { data: users, isLoading } = useFindUserByEmailQuery({ email });

  const { mutate, isPending } = useCreateShareMutation(listId);

  const handleAssign = () => {
    if (!ownerId) return;

    mutate({
      ownerId,
      taskListId: listId,
      usersId: selectedUsers.map((user) => user.id),
    });
  };

  const handleSelectUser = (user: {
    id: string;
    email: string;
    name: string;
  }) => {
    setSelectedUsers((prev) => {
      const isAlreadySelected = prev.some((u) => u.id === user.id);
      if (isAlreadySelected) {
        return prev.filter((u) => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
    setEmail("");
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timer);
  }, [email]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <p>+ Compartilhar</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartilhar Lista</DialogTitle>
          <DialogDescription>
            Busque usuários por e-mail para compartilhar esta lista
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <Badge
              key={user.id}
              variant="outline"
              className="flex items-center gap-1"
            >
              {user.name || user.email}
              <button
                onClick={() => removeSelectedUser(user.id)}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-search">Buscar por e-mail</Label>
          <Input
            id="email-search"
            type="email"
            placeholder="Digite o e-mail..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsTyping(true);
            }}
          />
        </div>

        <RenderIf shouldRender={isLoading && typing}>
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Buscando usuários...</span>
          </div>
        </RenderIf>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedUsers.some((u) => u.id === user.id)
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {selectedUsers.some((u) => u.id === user.id) && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}

          {!isLoading && !typing && users?.length === 0 && email && (
            <p className="text-gray-500 text-center py-4">
              Nenhum usuário encontrado
            </p>
          )}
        </div>

        <Button
          onClick={handleAssign}
          disabled={isPending || selectedUsers.length === 0}
          className="w-full mt-4"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Compartilhando...
            </>
          ) : (
            `Compartilhar com ${selectedUsers.length} usuário(s)`
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
