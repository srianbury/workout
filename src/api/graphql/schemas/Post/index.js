import { gql } from "apollo-server-micro";

const postSchema = gql`
  extend type Query {
    getPosts: [Post!]!
    getPostByPostId(postId: ID!): Post
    getPostsByUsername(username: String!): [Post!]
  }

  extend type Mutation {
    createPost(
      title: String!
      shortDescription: String!
      longDescription: String!
      videoUrlId: String
    ): Post
    deletePost(postId: ID!): Boolean!
  }

  type Post {
    postId: ID!
    title: String!
    shortDescription: String!
    longDescription: String!
    createdTs: DateTime!
    videoUrlId: String
    user: User!
  }
`;

export { postSchema };
