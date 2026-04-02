import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";

function createUserId(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token }) {
        if (token.email && !token.fdlst_private_userId) {
          token.fdlst_private_userId = createUserId(token.email);
        }
        return token;
      },
      async session({ session, token }) {
        if (
          session.user &&
          token.fdlst_private_userId &&
          !session.user.fdlst_private_userId
        ) {
          session.user.fdlst_private_userId =
            token.fdlst_private_userId as string;
        }
        return session;
      },
    },
  });
}
