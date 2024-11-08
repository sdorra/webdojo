import Link from "next/link";
import { allChallenges } from "content-collections";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle } from "lucide-react";

export default function ChallengesOverviewPage() {
  return (
    <>
      <ul className="space-y-2 mt-10 max-w-md">
        {allChallenges.map((challenge) => (
          <li key={challenge.name}>
            <Link href={`/challenges/${challenge.name}`} className="group">
              <Card className="group-hover:border-teal-500 flex items-center">
                <Circle className="size-8 ml-5 text-muted-foreground" />
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
