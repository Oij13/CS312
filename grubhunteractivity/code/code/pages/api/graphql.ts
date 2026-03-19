import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import dbConnect from "@/middleware/dbConnect";

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

const apolloHandler = startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async () => {
    await dbConnect();
    return {};
  },
});

const allowCors = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Apollo-Require-Preflight, X-Requested-With, Accept, Content-Type",
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    await handler(req, res);
  };
};

export default allowCors(apolloHandler);
