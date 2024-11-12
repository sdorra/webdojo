"use client";

import { useChallengeContainer } from "@/lib/useChallengeContainer";
import type { FileSystemTree } from "@webcontainer/api";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useTerminal from "@/lib/useTerminal";
import TerminalContainer from "./Terminal";
import { Preview } from "./Preview";
import { Editor } from "./Editor";
import { TestDialog } from "./TestDialog";
import { Challenge as ChallengeType } from "content-collections";
import { Instructions } from "./Instructions";
import { Solution } from "./Solution";
import { MarkAsComplete } from "./MarkAsComplete";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
  const [selectedTab, setSelectedTab] = useState("preview");
  const [code, setCode] = useState(challenge.main.content);
  const debouncedCode = useDebounce(code, 300);

  function copySolution() {
    setCode(challenge.solution.content);
  }

  function onTabChange(value: string) {
    terminal?.fit();
    setSelectedTab(value);
  }

  useEffect(() => {
    setContent(`./src/${challenge.main.filePath}`, debouncedCode);
  }, [setContent, debouncedCode, challenge]);

  return (
    <div className="flex flex-col h-full">
      <nav className="flex items-center gap-2 justify-end text-right py-2">
        <Instructions challenge={challenge} />
        <TestDialog challenge={challenge} test={test} />
        <Solution copySolution={copySolution} />
        <MarkAsComplete challenge={challenge.name} />
      </nav>
      <ResizablePanelGroup direction="horizontal" className="border rounded-md shadow-md">
        <ResizablePanel>
          <Editor value={code} onChange={setCode} className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Tabs value={selectedTab} onValueChange={onTabChange} className="h-full">
            <TabsList className="w-full rounded-none p-6">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="h-full">
              <Preview url={previewUrl} challenge={challenge.name} />
            </TabsContent>
            <TabsContent value="terminal" className="h-full" forceMount hidden={selectedTab !== "terminal"}>
              <TerminalContainer setRef={ref} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
