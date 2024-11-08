import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <section className="counter">
      <button data-testid="decrement" onClick={decrement}>
        -
      </button>
      <output data-testid="output">{count}</output>
      <button data-testid="increment" onClick={increment}>
        +
      </button>
    </section>
  );
}
