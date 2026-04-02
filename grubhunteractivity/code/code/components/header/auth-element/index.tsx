import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import styles from "./index.module.css";
import { Button } from "@/components/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUserId(session: any): string | null {
  // The user ID is stored in session.user.fdlst_private_userId
  return session?.user?.fdlst_private_userId || null;
}

export const AuthElement: React.FC = () => {
  const { data: session, status } = useSession();
  const userId = getUserId(session);

  return (
    <nav className={styles.authNav}>
      {status === "authenticated" && session ? (
        <>
          <span className={styles.greeting}>
            Hello, {session.user?.name || "User"}!
          </span>
          {userId && (
            <Button variant="outline" disabled={false}>
              <Link href={`/list/${userId}`}>Your Wish List</Link>
            </Button>
          )}
          <Button
            variant="blue"
            clickHandler={() => signOut()}
            disabled={false}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="blue" clickHandler={() => signIn()} disabled={false}>
          Sign In
        </Button>
      )}
    </nav>
  );
};
