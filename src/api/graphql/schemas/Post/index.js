import { gql } from "apollo-server-micro";

const PostSchema = gql`
  extend type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }

  extend type Mutation {
    createPost(shortDescription: String!, longDescription: String!): Post
    deletePost(id: ID!): Boolean!
  }

  type Post {
    id: ID!
    shortDescription: String!
    longDescription: String!
    creator: User!
  }
`;

export { PostSchema };
