type Props = {
  setRef: (element: HTMLDivElement) => void;
};

export function Terminal({ setRef }: Props) {
  return (
    <div className="overflow-hidden border">
      <div ref={setRef} className="h-full w-full" />
    </div>
  );
}
