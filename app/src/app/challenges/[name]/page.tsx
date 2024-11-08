import { Challenge } from "@/components/Challenge";
import { allChallenges, allFileSystems } from "content-collections";
import { notFound } from "next/navigation";

type Props = {
  params: {
    name: string;
  };
};

const fileSystem = allFileSystems[0];
if (!fileSystem) {
  throw new Error("No file system found");
}

export default async function Page({ params: { name } }: Props) {
  const challenge = allChallenges.find((c) => c.name === name);
  if (!challenge) {
    return notFound();
  }
  return <Challenge challenge={challenge} fileSystem={fileSystem.tree} />;
}
