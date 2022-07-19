import { getPosts } from "./getPosts";
import { getPost } from "./getPost";
import { getPostCreator } from "./getPostCreator";
import { createPost } from "./createPost";
import { deletePost } from "./deletePost";

const postResolver = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
    deletePost,
  },
  Post: {
    creator: getPostCreator,
  },
};

export { postResolver };
