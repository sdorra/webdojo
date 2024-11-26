import { db } from "@/db";
import { reviews, solutions } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import {
  CheckCircle,
  Circle,
  CircleDotDashed,
} from "lucide-react";
import { getServerSession } from "next-auth";

type ChallengeStatus = "pending" | "submitted" | "completed";

async function getChallengeStatus(challenge: string): Promise<ChallengeStatus> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return "pending";
  }

  const [result] = await db
    .select({
      solution: solutions.id,
      review: reviews.id,
    })
    .from(solutions)
    .where(
      and(
        eq(solutions.user, session.user.id),
        eq(solutions.challenge, challenge)
      )
    )
    .leftJoin(reviews, eq(reviews.solution, solutions.id))
    .execute();

  if (result) {
    if (result.review) {
      return "completed";
    } else {
      return "submitted";
    }
  }
  return "pending";
}

type ChallengeStatusIconProps = {
  status: ChallengeStatus;
  className?: string;
};

function ChallengeStatusIcon({ status, className }: ChallengeStatusIconProps) {
  switch (status) {
    case "pending":
      return <Circle className={cn("text-muted-foreground", className)} />;
    case "submitted":
      return <CircleDotDashed className={cn("text-purple-600", className)} />;
    case "completed":
      return <CheckCircle className={cn("text-green-600", className)} />;
  }
}

type Props = {
  challenge: string;
  className?: string;
};

export default async function ChallengeStatus({ challenge, className }: Props) {
  const status = await getChallengeStatus(challenge);
  return (
    <div title={status}>
      <ChallengeStatusIcon status={status} className={className} />
    </div>
  );
}
