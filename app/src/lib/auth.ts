import KeycloakProvider from "next-auth/providers/keycloak";
import env from "./env";
import { db } from "@/db";
import { AuthOptions } from "next-auth";
import { users } from "@/db/schema";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID,
      clientSecret: env.KEYCLOAK_CLIENT_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (!account) {
        console.error("No account");
        return false;
      }

      const name = user.name;
      if (!name) {
        console.error("User has no name", user);
        return false;
      }

      const email = user.email;
      if (!email) {
        console.error("User has no email", user);
        return false;
      }

      try {
        await db
          .insert(users)
          .values({
            id: account.providerAccountId,
            name,
            email,
            lastLogin: new Date(),
            createdAt: new Date(),
          })
          .onConflictDoUpdate({
            target: users.id,
            set: { lastLogin: new Date() },
          });
      } catch (error) {
        console.error("Failed to insert user", error);
        return false;
      }

      return true;
    },

    jwt({ token, account }) {
      if (token && account) {
        token.id = account.providerAccountId;
        token.id_token = account.id_token;
      }
      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      const issuerUrl = env.KEYCLOAK_ISSUER;
      const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);
      // @ts-expect-error id_token is not typed
      logOutUrl.searchParams.set("id_token_hint", token.id_token);
      await fetch(logOutUrl);
    },
  },
} satisfies AuthOptions;
