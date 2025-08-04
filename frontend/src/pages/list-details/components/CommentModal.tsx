import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCommentMutation } from "../hooks/useCreateCommentMutation";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUserStore } from "@/store/user.store";
import { useFindTaskCommentQuery } from "../hooks/useFindCommentQuery";

interface CommentsModalProps {
  taskId: string;
  listId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommentsModal({
  taskId,
  listId,
  isOpen,
  onOpenChange,
}: CommentsModalProps) {
  const { user } = useUserStore();
  const [commentContent, setCommentContent] = useState("");

  const { data: comments, isLoading } = useFindTaskCommentQuery({
    ownerId: user?.id || "",
    taskId,
    listId,
  });

  const { mutate: createComment, isPending } = useCreateCommentMutation(listId);

  const handleSubmit = () => {
    if (!user?.id || !commentContent.trim()) return;

    createComment({
      content: commentContent,
      listId,
      taskId,
      ownerId: user.id,
    });
    setCommentContent("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Comentários</DialogTitle>
          <DialogDescription>
            Adicione comentários ou visualize os existentes
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : comments?.length ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${comment.user.name}&background=random`}
                  />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{comment.user.name}</p>
                      <span className="text-xs text-gray-500">
                        {format(
                          new Date(comment.createdAt),
                          "dd/MM/yyyy HH:mm",
                          {
                            locale: ptBR,
                          }
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="mx-auto h-8 w-8" />
              <p className="mt-2">Nenhum comentário ainda</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <Label htmlFor="comment">Adicionar comentário</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="comment"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Digite seu comentário..."
              disabled={isPending}
            />
            <Button
              onClick={handleSubmit}
              disabled={!commentContent.trim() || isPending}
              size="icon"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
