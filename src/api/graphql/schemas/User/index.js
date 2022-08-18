import { gql } from "apollo-server-micro";

const userSchema = gql`
  extend type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
  }

  extend type Mutation {
    login(token: String!): User
  }

  type User {
    userId: ID!
    email: String!
    initials: String!
    username: String
    token: String!
    posts: [Post!]!
  }
`;

export { userSchema };
