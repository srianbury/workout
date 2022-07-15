import { mockPosts } from "../mockData";

async function getPost(parent, args, context, info) {
  const { id } = args;
  const post = mockPosts.find((post) => post.id == id); // loose equals here for string or int IDs
  if (post) {
    return post;
  }
  return null;
}

export { getPost };
