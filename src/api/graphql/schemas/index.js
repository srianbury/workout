import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    shortDescription: String!
    longDescription: String!
    creator: User!
  }

  type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }
`;

export { typeDefs };
