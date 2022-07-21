import { gql } from "apollo-server-micro";

const userSchema = gql`
  extend type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
  }

  type User {
    userId: ID!
    username: String!
    posts: [Post!]!
  }
`;

export { userSchema };
