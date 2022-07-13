import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
  }
`;

export { typeDefs };
