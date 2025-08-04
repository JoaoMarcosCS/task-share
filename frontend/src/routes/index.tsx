import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Register } from "@/pages/register";
import { Login } from "@/pages/login";
import { useUserStore } from "@/store/user.store";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Home } from "@/pages/home";
import { LayoutPrivate } from "@/components/layout/LayoutPrivate";
import { CreateTaskList } from "@/pages/create-task-list";
import { TaskListDetails } from "@/pages/list-details/[listId]";
import { CreateTask } from "@/pages/create-task";
import { TaskListShares } from "@/pages/list-shares";

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
          element: <LayoutPrivate />,
          loader: isAuthenticate,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "/lists/new",
              element: <CreateTaskList />,
            },
            {
              path: "/lists/:listId",
              element: <TaskListDetails />,
            },
            {
              path: "/lists/:listId/tasks/new",
              element: <CreateTask />,
            },
            {
              path: "/lists/:listId/shares",
              element: <TaskListShares />,
            },
          ],
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
