import { gql } from "apollo-server-micro";

const UserSchema = gql`
  extend type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
  }

  type User {
    id: ID!
    username: String!
    posts: [Post!]!
  }
`;

export { UserSchema };
