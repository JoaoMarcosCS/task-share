import { House, CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from "@/store/user.store";
import { ActiveLink } from "../common/ActiveLink";
import { takeInitialLetters } from "@/utils/take-initial-letters";

export const Footer = () => {
  const { user } = useUserStore((state) => state);

  return (
    <nav className="w-full justify-center mb-5 fixed bottom-0 items-center z-50 max-sm:flex hidden">
      <ul className="flex justify-between items-center w-11/12 py-1 px-3 shadow rounded-full border-t-2 border-slate-200 bg-slate-100">
        <ActiveLink directionTooltip="right" href="/" tooltipText="Suas listas">
          <House />
        </ActiveLink>

        <ActiveLink
          directionTooltip="right"
          href="/lists/new"
          tooltipText="Criar lista"
        >
          <CirclePlus />
        </ActiveLink>

        <ActiveLink
          directionTooltip="right"
          href="/profile"
          tooltipText="Perfil"
        >
          <Avatar>
            <AvatarFallback className="rounded-full bg-yellow-400">
              {takeInitialLetters(user?.name ?? "")}
            </AvatarFallback>
          </Avatar>
        </ActiveLink>
      </ul>
    </nav>
  );
};
