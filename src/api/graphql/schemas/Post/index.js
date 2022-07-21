import { gql } from "apollo-server-micro";

const postSchema = gql`
  extend type Query {
    getPosts: [Post!]!
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(shortDescription: String!, longDescription: String!): Post
    deletePost(postId: ID!): Boolean!
  }

  type Post {
    postId: ID!
    shortDescription: String!
    longDescription: String!
    user: User!
  }
`;

export { postSchema };
