import { LoginButton } from "./LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { createHash } from "node:crypto";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { LogoutButton } from "./LogoutButton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

function createGravatarUrl(email: string) {
  const hash = createHash("sha256");
  hash.update(email);
  const digest = hash.digest("hex");
  return `https://www.gravatar.com/avatar/${digest}?d=identicon`;
}

export async function Account({ className }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <LoginButton />;
  }

  const user = session.user;
  if (!user) {
    // TODO: make something better
    return null;
  }

  const imageUrl = createGravatarUrl(user.email || "??");
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          className={cn("shadow-md ring-1 ring-muted-foreground", className)}
        >
          {/* AvatarImage could not be uses, because we could not pass cross origin to it */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="aspect-square h-full w-full"
            src={imageUrl}
            alt={user.name || "Unknown"}
            crossOrigin="anonymous"
          />
          <AvatarFallback>{initials(user.name || "?")}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-5">
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-muted-foreground text-sm">{user.email}</p>
        <div className="mt-5 text-right">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
