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
import { Challenge as ChallengeType } from "content-collections";
import { Instructions } from "./Instructions";
import { Solution } from "./Solution";

type Props = {
  challenge: ChallengeType;
  fileSystem: FileSystemTree;
};

export function Challenge({ challenge, fileSystem }: Props) {
  const { ref, terminal } = useTerminal();
  const { previewUrl, setContent, test } = useChallengeContainer({
    challenge,
    fileSystem,
    terminal,
  });
  const [code, setCode] = useState(challenge.main.content);
  const debouncedCode = useDebounce(code, 300);

  function copySolution() {
    setCode(challenge.solution.content);
  }

  useEffect(() => {
    setContent(`./src/${challenge.main.filePath}`, debouncedCode);
  }, [setContent, debouncedCode, challenge]);

  return (
    <main className="h-screen w-full">
      <nav className="space-x-2 border-b text-right py-2">
        <Instructions challenge={challenge} />
        <TestDialog test={test} />
        <Solution copySolution={copySolution} />
      </nav>
      <section className="grid grid-cols-2 grid-rows-2 h-full">
        <Editor value={code} onChange={setCode} className="row-span-2" />
        <Preview url={previewUrl} challenge={challenge.name} />
        <Terminal setRef={ref} />
      </section>
    </main>
  );
}
