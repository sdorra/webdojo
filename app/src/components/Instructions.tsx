import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Challenge } from "content-collections";

type Props = {
  challenge: Challenge;
};

export function Instructions({ challenge }: Props) {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Instructions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{challenge.title}</DialogTitle>
          <DialogDescription>{challenge.description}</DialogDescription>
        </DialogHeader>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: challenge.instructions }}
        />
      </DialogContent>
    </Dialog>
  );
}
