import { useUserStore } from "@/store/user.store";
import { removeTokenFromHeader } from "@/utils/remove-token-from-header";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const { removeUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    removeTokenFromHeader();

    navigate("/login");
  };

  return { handleLogout };
};
