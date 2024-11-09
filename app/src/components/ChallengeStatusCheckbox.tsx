"use client";

import dynamic from "next/dynamic";

// we need a dynamic import, because useLocalStorage is a client-side only hook
const ChallengeStatusCheckbox = dynamic(
  () => import("./InternalChallengeStatusCheckbox"),
  {
    ssr: false,
  }
);

export default ChallengeStatusCheckbox;