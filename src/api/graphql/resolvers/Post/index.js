import { getPosts } from "./getPosts";
import { getPostByPostId } from "./getPostByPostId";
import { getPostCreator } from "./getPostCreator";
import { createPost } from "./createPost";
import { deletePost } from "./deletePost";

const postResolver = {
  Query: {
    getPosts,
    getPostByPostId,
  },
  Mutation: {
    createPost,
    deletePost,
  },
  Post: {
    user: getPostCreator,
  },
};

export { postResolver };
