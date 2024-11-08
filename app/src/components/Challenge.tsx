"use client";

import { useChallengeContainer } from "@/lib/useChallengeContainer";
import type { FileSystemTree } from "@webcontainer/api";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useTerminal from "@/lib/useTerminal";
import { Terminal } from "./Terminal";
import { Preview } from "./Preview";
import { Editor } from "./Editor";
import { TestDialog } from "./TestDialog";

type Props = {
  fileSystem: FileSystemTree;
};

const sample = `import {  } from "react";

export function Counter() {
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
}`;

export function Challenge({ fileSystem }: Props) {
  const { ref, terminal } = useTerminal();
  const { previewUrl, setContent, test } = useChallengeContainer({
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
      <nav className="p-2 border-b">
        <TestDialog test={test} />
      </nav>
      <section className="grid grid-cols-2 grid-rows-2 h-full">
        <Editor defaultValue={code} onChange={setCode} className="row-span-2" />
        <Preview url={previewUrl} />
        <Terminal setRef={ref} />
      </section>
    </main>
  );
}
