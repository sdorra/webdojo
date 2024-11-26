"use server";

import { db } from "@/db";
import { solutions } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function submitSolution(
  challenge: string,
  code: string,
  note?: string
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await db
    .insert(solutions)
    .values({
      user: session.user.id,
      code,
      note,
      challenge,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [solutions.user, solutions.challenge],
      set: {
        code,
        note,
        updatedAt: new Date(),
      },
    });
}
