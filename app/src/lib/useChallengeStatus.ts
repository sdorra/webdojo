import { useLocalStorage } from "@uidotdev/usehooks";

type Status = "pending" | "completed";

export function useChallengeStatus(challenge: string) {
  return useLocalStorage<Status>(`challenge.${challenge}`, "pending");
}
