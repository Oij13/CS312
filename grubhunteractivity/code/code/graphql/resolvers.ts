import { locationMutationResolvers } from "@/graphql/locations/mutations";
import { locationQueryResolvers } from "@/graphql/locations/queries";

export const resolvers = {
  Query: {
    ...locationQueryResolvers,
  },
  Mutation: {
    ...locationMutationResolvers,
  },
};
