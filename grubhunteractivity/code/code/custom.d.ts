declare global {
  var mongoose:
    | {
        conn: import("mongoose").Mongoose | null;
        promise: Promise<import("mongoose").Mongoose> | null;
      }
    | undefined;
}

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      fdlst_private_userId?: string;
    };
  }
}

export {};
