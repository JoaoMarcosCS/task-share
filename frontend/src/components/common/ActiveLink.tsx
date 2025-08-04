import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";

interface ActiveLinkProps {
  href: string;
  tooltipText: string;
  directionTooltip: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
  orientation?: "col" | "row";
}

export const ActiveLink = ({
  href,
  tooltipText,
  children,
  directionTooltip,
  orientation = "row",
}: ActiveLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={`flex flex-${orientation} text-green-500 gap-2 transition-all justify-center 
            text-xs font-semibold items-center  no-underline  
            rounded-sm hover:text-red-400 ${isActive ? "text-red-400" : ""}`}
          >
            <p>{children}</p>
          </Link>
        </TooltipTrigger>
        <TooltipContent side={directionTooltip}>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
