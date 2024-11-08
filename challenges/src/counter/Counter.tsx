import {} from "react";

export default function Counter() {
  function increment() {

  }

  function decrement() {

  }

  return (
    <section className="counter">
      <button data-testid="decrement" onClick={decrement}>
        -
      </button>
      <output data-testid="output">0</output>
      <button data-testid="increment" onClick={increment}>
        +
      </button>
    </section>
  );
}
