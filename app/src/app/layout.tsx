import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[auto,1fr,auto] min-h-screen p-5">
          <header className="flex items-center gap-5">
            <h1 className="font-bold text-xl">WebDojo</h1>
            <nav>
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
          </header>
          <main>{children}</main>
          <footer className="text-right">
            Made with ❤️ by Sebastian Sdorra
          </footer>
        </div>
      </body>
    </html>
  );
}
