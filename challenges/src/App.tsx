import { useChallenge } from "./useChallenge";

export function App() {
  const Challenge = useChallenge();

  return (
    <main>
      <Challenge />
    </main>
  );
}
