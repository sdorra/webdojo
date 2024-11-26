import Link from "next/link";
import { Account } from "./Account";

export function Header() {
  return (
    <header className="flex items-center gap-5">
      <h1 className="font-bold text-xl">WebDojo</h1>
      <nav className="flex-grow">
        <ul>
          <li>
            <Link
              href="/"
              className="underline decoration-2 decoration-transparent hover:decoration-foreground"
            >
              Challenges
            </Link>
          </li>
        </ul>
      </nav>
      <Account />
    </header>
  );
}
