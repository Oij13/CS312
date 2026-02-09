import gql from "graphql-tag";

export const typeDefs = gql`
    type LocationWeatherType {
        zip: String!
        weather: String!
        tempC: String!
        tempF: String!
        humidity: String
        friends: [String]
    }
    
    input LocationWeatherInput {
        zip: String!
        weather: String
        tempC: String
        tempF: String
        humidity: String
        friends: [String]
    }
    
    type Query {
        weather(zip: String): [LocationWeatherType]!
    }
    
    type Mutation {
        weather(data: LocationWeatherInput): [LocationWeatherType]!    
    }
`;