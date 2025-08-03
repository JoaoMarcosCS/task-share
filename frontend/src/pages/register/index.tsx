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
import { useCreateUserFormHandler } from "./hooks/useCreateUserFormHandler";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export function Register() {
  const { form, handleCreateUser, isPending } = useCreateUserFormHandler();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Criar conta</h1>

          <p className="text-gray-600">Preencha os dados para se cadastrar</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateUser)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm ">
          Já tem uma conta?{" "}
          <Link to="/login">
            <p>Faça login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
