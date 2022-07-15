import { mockUsersDict } from "../../mockData";

async function creator(post, args, context, info) {
  return mockUsersDict[post.creatorId];
}

export { creator };
