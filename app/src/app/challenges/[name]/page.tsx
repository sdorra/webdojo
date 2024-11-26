import { Challenge } from "@/components/Challenge";
import { authOptions } from "@/lib/auth";
import { allChallenges, allFileSystems } from "content-collections";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);

  return (
    <Challenge
      challenge={challenge}
      fileSystem={fileSystem.tree}
      user={session?.user}
    />
  );
}
