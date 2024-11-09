import Link from "next/link";
import { allChallenges } from "content-collections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import ChallengeStatusCheckbox from "@/components/ChallengeStatusCheckbox";

export default function ChallengesOverviewPage() {
  return (
    <>
      <ul className="space-y-2 mt-10 max-w-md">
        {allChallenges.map((challenge) => (
          <li key={challenge.name}>
            <Link href={`/challenges/${challenge.name}`} className="group">
              <Card className="group-hover:bg-accent bg-background border flex items-center">
                <ChallengeStatusCheckbox challenge={challenge.name} />
                <CheckCircle className="size-8 ml-5 text-green-600 hidden group-has-[:checked]:block" />
                <Circle className="size-8 ml-5 text-muted-foreground block group-has-[:checked]:hidden" />
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
