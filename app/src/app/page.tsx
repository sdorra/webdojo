import Link from "next/link";
import { allChallenges } from "content-collections";

export default function ChallengesOverviewPage() {
  return (
    <>
    <h1>WebDojo</h1>
    <ul className="mt-10">
      {allChallenges.map((challenge) => (
        <li key={challenge.name}>
          <Link href={`/challenges/${challenge.name}`}>{challenge.title}</Link>
        </li>
      ))}
    </ul>
    </>
  );
}
