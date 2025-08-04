import { CirclePlus, House } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActiveLink } from "../common/ActiveLink";
import { takeInitialLetters } from "@/utils/take-initial-letters";
import { LogoutDialog } from "../common/LogoutDialog";

export const SideBar = () => {
  const { user } = useUserStore((state) => state);

  return (
    <div className="h-screen flex max-sm:hidden fixed flex-col justify-center items-center">
      <div className="">
        <h1 className="text-black font-semibold text-3xl fixed top-0 ms-4 left-0 mt-2">
          Task Share
        </h1>
      </div>

      <div className="rounded-full shadow-md py-6 w-14 gap-10 flex flex-col ms-10 bg-slate-100">
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

        <LogoutDialog />
      </div>
    </div>
  );
};
