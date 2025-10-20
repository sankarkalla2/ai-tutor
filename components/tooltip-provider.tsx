import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

type TooltipProviderProps = {
  children: React.ReactNode;
  label?: string;
  trigger?: React.ReactNode;
};
export const TooltipProvider = ({
  trigger,
  children,
  label,
}: TooltipProviderProps) => {
  return (
    <Tooltip>
      {trigger ? (
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      ) : (
        <TooltipTrigger>{label}</TooltipTrigger>
      )}

      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  );
};
