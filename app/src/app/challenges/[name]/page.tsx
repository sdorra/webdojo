import { Challenge } from "@/components/Challenge";
import { createFileSystem } from "@/lib/createFileSystem";
import { allChallenges } from "content-collections";
import { notFound } from "next/navigation";

type Props = {
  params: {
    name: string;
  };
};

export default async function Page({ params: { name } }: Props) {
  const challenge = allChallenges.find((c) => c.name === name);
  if (!challenge) {
    return notFound();
  }
  const fileSystem = await createFileSystem();
  return <Challenge challenge={challenge} fileSystem={fileSystem} />;
}
