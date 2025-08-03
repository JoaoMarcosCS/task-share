import {
  useRouteError,
  isRouteErrorResponse,
  Navigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "Ocorreu um erro inesperado";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;

    if (error.status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");
      return <Navigate to="/login" replace />;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-lg text-muted-foreground">{errorMessage}</p>
      <Button onClick={() => window.location.reload()}>Recarregar</Button>
    </div>
  );
}
