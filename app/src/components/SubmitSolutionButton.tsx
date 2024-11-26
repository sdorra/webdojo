import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Challenge } from "content-collections";
import { Textarea } from "./ui/textarea";
import { submitSolution } from "./submitSolution";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Loading } from "./Loading";

type Props = {
  challenge: Challenge;
  code: string;
};

export function SubmitSolutionButton({ challenge, code }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { pending } = useFormStatus();

  async function submitForm(data: FormData) {
    const note = data.get("note");

    if (typeof note !== "string") {
      throw new Error("Invalid note");
    }

    await submitSolution(challenge.name, code, note);

    setIsDialogOpen(false);
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Submit Solution</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Solution</DialogTitle>
            <DialogDescription>
              Submit your solution to the <strong>{challenge.name}</strong>{" "}
              challenge.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" action={submitForm}>
            <Textarea
              name="note"
              placeholder="Enter here some notes to your solution ..."
            />

            <DialogFooter>
              <Button className="w-20" disabled={pending}>
                {pending ? <Loading /> : <>Submit</>}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
