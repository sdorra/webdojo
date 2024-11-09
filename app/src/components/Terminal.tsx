import { cn } from "@/lib/utils";

type Props = {
  setRef: (element: HTMLDivElement) => void;
  className?: string;
};

export function Terminal({ setRef, className }: Props) {
  return (
    <div className={cn("overflow-hidden border", className)}>
      <div ref={setRef} className="h-full w-full" />
    </div>
  );
}
