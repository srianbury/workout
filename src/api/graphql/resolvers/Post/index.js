import { getPosts } from "./getPosts";
import { getPostByPostId } from "./getPostByPostId";
import { getPostCreator } from "./getPostCreator";
import { createPost } from "./createPost";
import { deletePost } from "./deletePost";
import { getPostsByUsername } from "./getPostsByUsername";

const postResolver = {
  Query: {
    getPosts,
    getPostByPostId,
    getPostsByUsername,
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
