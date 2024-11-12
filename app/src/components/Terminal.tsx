import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  setRef: (element: HTMLDivElement) => void;
  className?: string;
};

function TerminalContainer({ setRef, className }: Props) {
  return (
    <div className={cn("overflow-hidden p-4 h-full", className)}>
      <div className="h-full" ref={setRef} />
    </div>
  );
}

export default TerminalContainer;