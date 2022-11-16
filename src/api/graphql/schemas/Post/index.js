import { gql } from "apollo-server-micro";

const postSchema = gql`
  extend type Query {
    getPosts: [Post!]!
    getPostByPostId(postId: ID!): Post
    getPostsByUsername(username: String!): [Post!]
  }

  extend type Mutation {
    createPost(
      token: String!
      title: String!
      shortDescription: String!
      longDescription: String!
      videoSource: String
    ): Post
    deletePost(postId: ID!): Boolean!
  }

  type Post {
    postId: ID!
    title: String!
    shortDescription: String!
    longDescription: String!
    createdAt: DateTime!
    media: PostMedia
    user: User!
  }

  type PostMedia {
    video: PostMediaVideo
    photo: String
  }

  type PostMediaVideo {
    source: String!
    id: String!
  }
`;

export { postSchema };
