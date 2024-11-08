import { useEffect, useState } from "react";

const challenges = import.meta.glob(["./*/*.tsx", "!./*/*.test.tsx", "!./*/*.solution.tsx"]);

function ChallengeList() {
  return (
    <section>
      <h1>Challenges</h1>
      <ul>
        {Object.keys(challenges).map((path) => {
          const challenge = path.split("/")[1];
          return (
            <li key={challenge}>
              <a href={`?challenge=${challenge}`}>{challenge}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function useChallenge() {
  const [Component, setComponent] = useState<any>(() => () => (
    <h1>Loading...</h1>
  ));
  useEffect(() => {
    const challenge = new URLSearchParams(window.location.search).get(
      "challenge"
    );
    if (typeof challenge !== "string") {
      setComponent(() => () => <ChallengeList />);
    } else {
      for (const path in challenges) {
        if (path.startsWith(`./${challenge}/`)) {
          const importFn = challenges[path];
          if (importFn) {
            importFn().then((mod: any) => {
              setComponent(() => mod.default);
            });
          }

          return;
        }
      }
      setComponent(() => () => <h1>Challenge {challenge} not found</h1>);
    }
  }, []);
  return Component;
}
