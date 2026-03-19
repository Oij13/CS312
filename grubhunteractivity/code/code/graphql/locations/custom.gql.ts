export const locationCustomTypeDefs = /* GraphQL */ `
  directive @cacheControl(maxAge: Int) on OBJECT | FIELD_DEFINITION 

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  type Location @cacheControl(maxAge: 86400) {
    address: String!
    street: String
    zipcode: String!
    borough: String!
    cuisine: String!
    grade: String!
    name: String!
    on_wishlist: [String!]! @cacheControl(maxAge: 60)
    location_id: String!
  }
`;