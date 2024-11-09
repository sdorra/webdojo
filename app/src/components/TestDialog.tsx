import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDescription } from "@/components/ui/alert";

import { Button } from "./ui/button";
import useTerminal, { type Terminal } from "@/lib/useTerminal";
import { Terminal as TerminalCmp } from "./Terminal";
import { useEffect, useRef, useState } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Loading } from "./Loading";
import { cn } from "@/lib/utils";
import { Challenge } from "content-collections";

type ResultProps = {
  returnCode?: number;
};

function ResultDescription({ returnCode }: ResultProps) {
  if (returnCode === undefined) {
    return <AlertDescription>Running tests...</AlertDescription>;
  }

  if (returnCode === 0) {
    return <AlertDescription>Tests passed successfully</AlertDescription>;
  }

  return (
    <AlertDescription>
      Tests failed with return code {returnCode}
    </AlertDescription>
  );
}

type ResultIconProps = ResultProps & {
  className?: string;
};

function ResultIcon({ returnCode, className }: ResultIconProps) {
  if (returnCode === undefined) {
    return <Loading className={cn("size-8", className)} />;
  }

  if (returnCode === 0) {
    return (
      <CircleCheckBig className={cn("size-8 text-green-500", className)} />
    );
  }

  return <CircleX className={cn("size-8 text-red-500", className)} />;
}

function Result({ returnCode }: ResultProps) {
  return (
    <Card className="flex items-center">
      <ResultIcon returnCode={returnCode} className="ml-5" />
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
        <ResultDescription returnCode={returnCode} />
      </CardHeader>
    </Card>
  );
}

type Props = {
  challenge: Challenge;
  test?: (terminal: Terminal) => Promise<number> | undefined;
};

function TestResult({ test }: Props) {
  const { ref, terminal } = useTerminal();
  const [returnCode, setReturnCode] = useState<number>();
  const isRunning = useRef(false);

  useEffect(() => {
    if (isRunning.current) {
      return;
    }
    isRunning.current = true;
    if (test) {
      test(terminal)?.then(setReturnCode);
    }
  }, [terminal, test]);

  return (
    <>
      <Result returnCode={returnCode} />
      <TerminalCmp setRef={ref} className="rounded-xl shadow-lg" />
    </>
  );
}

export function TestDialog({ challenge, test }: Props) {
  const [tries, setTries] = useState(0);

  function onOpenChange(open: boolean) {
    if (open) {
      setTries(tries + 1);
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger disabled={!test} asChild>
        <Button>Test</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{challenge.title}</DialogTitle>
          <DialogDescription>{challenge.description}</DialogDescription>
        </DialogHeader>
        <TestResult key={tries} challenge={challenge} test={test} />
      </DialogContent>
    </Dialog>
  );
}
