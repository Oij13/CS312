export const locationQueryTypeDefs = /* GraphQL */ `
  allLocations: [Location!]!
  locationsById(location_ids: [String!]!): [Location!]!
  onUserWishlist(user_id: String!): [Location!]!
`;