import { mockPosts } from "../../mockData";

async function posts(user, args, context, info) {
  return mockPosts.filter((post) => post.creatorId === user.id);
}

export { posts };
