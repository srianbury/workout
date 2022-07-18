import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getPosts } from "./getPosts";
import { getPost } from "./getPost";
import { creator } from "../resolvers/Post/creator";
import { posts } from "../resolvers/User/posts";
import { mockPosts } from "../resolvers/mockData";

const resolvers = {
  Query: {
    getUsers,
    getUserByUsername,
    getPosts,
    getPost,
  },
  Mutation: {
    createPost: (parent, args, context, info) => {
      const { shortDescription, longDescription } = args;
      const post = {
        id: mockPosts.length + 1,
        shortDescription,
        longDescription,
        creatorId: 1,
      };
      mockPosts.push(post);
      return post;
    },
    deletePost: (parent, args, context, info) => {
      // mockPosts = [...mockPosts.filter((post, index) => post.id != index - 1)];
      return true;
    },
  },
  User: {
    posts,
  },
  Post: {
    creator,
  },
};

export { resolvers };
