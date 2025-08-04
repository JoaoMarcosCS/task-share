import { LogoutDialog } from "../common/LogoutDialog";

export const Header = () => {
  return (
    <nav
      className="w-full max-sm:flex hidden
     bg-slate-100 z-50 pr-24 max-sm:pr-0 fixed
      justify-between items-center h-16 py-2 pl-1 shadow-md"
    >
      <div className="w-full flex justify-start items-center pt-2 ps-2 gap-5">
        <h1 className="text-black font-semibold text-3xl">Task Share</h1>
      </div>

      <div>
        <LogoutDialog />
      </div>
    </nav>
  );
};
