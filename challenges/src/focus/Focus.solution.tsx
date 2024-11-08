import { useRef } from "react";

export default function Counter() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <section>
      <input ref={ref} type="text" name="name" id="name" />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </section>
  );
}
