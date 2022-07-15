import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getPosts } from "./getPosts";
import { getPost } from "./getPost";
import { creator } from "../resolvers/Post/creator";
import { posts } from "../resolvers/User/posts";

const resolvers = {
  Query: {
    getUsers,
    getUserByUsername,
    getPosts,
    getPost,
  },
  User: {
    posts,
  },
  Post: {
    creator,
  },
};

export { resolvers };
