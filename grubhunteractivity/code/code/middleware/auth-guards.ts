import { GraphQLError } from "graphql/error";
import { JWT } from "next-auth/jwt";

interface ParamInterface {
  user_id: string;
  location_id: string;
}

interface ContextInterface {
  token?: JWT | null;
}

export function authGuard(
  param: ParamInterface,
  context: ContextInterface,
): true | GraphQLError {
  if (!context || !context.token || !context.token.fdlst_private_userId) {
    return new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 500 },
      },
    });
  }
  if (context.token.fdlst_private_userId !== param.user_id) {
    return new GraphQLError("User is not authorized to modify this wish list", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 500 },
      },
    });
  }
  return true;
}
