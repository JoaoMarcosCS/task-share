import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

import { Button } from "../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useLoginFormHandler } from "./hooks/useLoginFormHandler";
import { Link } from "react-router-dom";

export function Login() {
  const { form, handleCreateUser, isPending } = useLoginFormHandler();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Faça Login</h1>

          <p className="text-gray-600">Preencha os dados para fazer login</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateUser)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        {...field}
                      />
                      <Button
                        asChild
                        variant="ghost"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <p className="text-black">
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 " />
                          ) : (
                            <Eye className="h-4 w-4 " />
                          )}
                        </p>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Entrando..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm ">
          Não tem uma conta?{" "}
          <Link to="/register">
            <p>Cadastre-se</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
