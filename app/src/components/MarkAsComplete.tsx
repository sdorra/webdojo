"use client";

import { CheckCircle, Circle } from "lucide-react";
import ChallengeStatusCheckbox from "./ChallengeStatusCheckbox";

type Props = {
  challenge: string;
};

export function MarkAsComplete({ challenge }: Props) {
  return (
    <label className="border rounded-md text-sm h-9 font-medium border-input shadow-sm px-4 py-2 transition-colors bg-background hover:bg-accent cursor-pointer inline-flex items-center gap-2 group has-[:checked]:border-green-600">
      <ChallengeStatusCheckbox challenge={challenge} />
      <CheckCircle className="size-4 text-green-600 hidden group-has-[:checked]:block" />
      <Circle className="size-4 text-muted-foreground block group-has-[:checked]:hidden" />
      Mark as complete
    </label>
  );
}
