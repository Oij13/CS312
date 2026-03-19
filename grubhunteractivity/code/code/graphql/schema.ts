import gql from "graphql-tag";
import { locationCustomTypeDefs } from "./locations/custom.gql"; 
import { locationMutationTypeDefs } from "./locations/mutations.gql";
import { locationQueryTypeDefs } from "./locations/queries.gql";

export const typeDefs = gql`
  ${locationCustomTypeDefs}

  type Query {
    ${locationQueryTypeDefs}
  }

  type Mutation {
    ${locationMutationTypeDefs}
  }
`;
