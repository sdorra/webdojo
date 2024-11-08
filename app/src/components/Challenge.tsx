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
import Link from "next/link";

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

  useEffect(() => {
    setContent(`./src/${challenge.main.filePath}`, debouncedCode);
  }, [setContent, debouncedCode, challenge]);

  return (
    <main className="h-screen w-full">
      <nav className="p-2 space-x-5 border-b">
        <TestDialog test={test} />
        <Link href="/">Back</Link>
      </nav>
      <section className="grid grid-cols-2 grid-rows-2 h-full">
        <Editor defaultValue={code} onChange={setCode} className="row-span-2" />
        <Preview url={previewUrl} challenge={challenge.name} />
        <Terminal setRef={ref} />
      </section>
    </main>
  );
}
