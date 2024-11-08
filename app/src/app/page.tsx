import { Challenge } from "@/components/Challenge";
import { createFileSystem } from "@/lib/createFileSystem";

export default async function Page() {
  const fileSystem = await createFileSystem("counter");
  return <Challenge fileSystem={fileSystem} />;
}
