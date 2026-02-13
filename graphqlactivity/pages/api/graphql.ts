import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/graphql/resolver";
import { typeDefs } from "@/graphql/schema";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/middleware/db-connect";

const server = new ApolloServer({
    resolvers,
    typeDefs
});

const handler = startServerAndCreateNextHandler(server);

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Allow", "POST");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS"){
        res.status(200).end();
    }

    return await fn(req, res);
};

const connectDb = (fn: NextApiHandler) => 
    async (req: NextApiRequest, res: NextApiResponse) => {
        await dbConnect();
        return await fn(req, res);
    }

export default connectDb(allowCors(handler));