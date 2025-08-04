/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function routeGuard(Component: JSX.Element): React.FC {
  return function WithAuth(props: any) {
    const navigate = useNavigate();
    const accessToken = useUserStore((state) => state.user?.accessToken);

    useEffect(() => {
      if (!accessToken) {
        navigate("/login");
      }
    }, [accessToken, navigate]);

    return Component;
  };
}
