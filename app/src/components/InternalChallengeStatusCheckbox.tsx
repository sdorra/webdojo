import { useChallengeStatus } from "@/lib/useChallengeStatus";

type Props = {
  challenge: string;
};

export default function ChallengeStatusCheckbox({ challenge }: Props) {
  const [status, setStatus] = useChallengeStatus(challenge);
  return (
    <input
      type="checkbox"
      className="hidden"
      checked={status === "completed"}
      onChange={() =>
        setStatus((s) => (s === "completed" ? "pending" : "completed"))
      }
    />
  );
}
