/* eslint-disable react-hooks/rules-of-hooks */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Register } from "@/pages/register";
import { Login } from "@/pages/login";
import { useUserStore } from "@/store/user.store";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const isAuthenticate = async () => {
  const accessToken = useUserStore.getState().user?.accessToken;
  if (!accessToken) throw new Response("Unauthorized", { status: 401 });
  return null;
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <App />,
          loader: isAuthenticate,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
