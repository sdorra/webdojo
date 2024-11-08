"use client";

import { useChallengeContainer } from "@/lib/useChallengeContainer";
import type { FileSystemTree } from "@webcontainer/api";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useTerminal from "@/lib/useTerminal";
import { Terminal } from "./Terminal";
import { Preview } from "./Preview";
import { Editor } from "./Editor";

type Props = {
  fileSystem: FileSystemTree;
};

const sample = `import { useState } from "react";

export function Counter() {
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
}`;

export function Challenge({ fileSystem }: Props) {
  const { ref, terminal } = useTerminal();
  const { previewUrl, setContent } = useChallengeContainer({
    fileSystem,
    terminal,
  });
  const [code, setCode] = useState(sample);
  const debouncedCode = useDebounce(code, 300);

  useEffect(() => {
    setContent("./src/Counter.tsx", debouncedCode);
  }, [setContent, debouncedCode]);

  return (
    <main className="h-screen w-full">
      <nav>
        <button>Submit</button>
      </nav>
      <section className="grid grid-cols-2 grid-rows-2 h-full">
        <Editor value={code} onChange={setCode} className="row-span-2" />
        <Preview url={previewUrl} />
        <Terminal setRef={ref} />
      </section>
    </main>
  );
}
