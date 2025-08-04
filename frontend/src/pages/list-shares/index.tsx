import { useParams } from "react-router-dom";
import { FindUserByEmailCard } from "../create-share/components/FindUserByEmailCard";
import { useUserStore } from "@/store/user.store";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFindShareQuery } from "./hooks/useFindSharesQuery";
import { useDeleteShareMutation } from "./hooks/useDeleteShareMutation";

export function TaskListShares() {
  const { listId } = useParams<{ listId: string }>();
  const ownerId = useUserStore((state) => state.user?.id);

  const { data: shares, isLoading } = useFindShareQuery({
    taskListId: listId!,
    ownerId: ownerId!,
  });

  const { mutate: deleteShare } = useDeleteShareMutation(listId!);

  if (!listId || !ownerId) {
    return <div>Carregando...</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Compartilhamentos</h1>
        <FindUserByEmailCard listId={listId} key={listId} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Compartilhamentos Ativos</h2>

        {shares?.length ? (
          <ul className="divide-y divide-gray-200">
            {shares.map((share) => (
              <li
                key={share.id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        share.user.name
                      )}&background=random`}
                    />
                    <AvatarFallback>{share.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{share.user.name}</p>
                    <p className="text-sm text-gray-500">{share.user.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="mr-4">
                  {share.user.id === ownerId ? "Proprietário" : "Compartilhado"}
                </Badge>
                {share.user.id !== ownerId && (
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      deleteShare({
                        listId,
                        ownerId,
                        userId: share.user.id,
                      })
                    }
                  >
                    Remover
                  </Button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum compartilhamento encontrado</p>
            <p className="text-sm text-gray-400 mt-2">
              Use o botão acima para compartilhar esta lista com outros usuários
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
