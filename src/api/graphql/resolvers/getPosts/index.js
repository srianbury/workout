import { mockPosts } from "../mockData";

async function getPosts(parent, args, context, info) {
  return mockPosts;
}

export { getPosts };
