import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Editor({ value, onChange, className }: Props) {
  return (
    <textarea
      className={cn("border", className)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
}