import Link from "next/link";
import { allChallenges } from "content-collections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChallengeStatus from "@/components/ChallengeStatus";

export default function ChallengesOverviewPage() {
  return (
    <>
      <ul className="space-y-2 mt-10 max-w-md">
        {allChallenges.map((challenge) => (
          <li key={challenge.name}>
            <Link href={`/challenges/${challenge.name}`} className="group">
              <Card className="group-hover:bg-accent bg-background border flex items-center">
                <ChallengeStatus challenge={challenge.name}  className="size-8 ml-5" />
                <CardHeader>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
