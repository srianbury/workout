import { mockUsers } from "../mockData";

async function getUserByUsername(parent, args, context, info) {
  const { username } = args;
  const user = mockUsers.find((user) => user.username === username);
  if (user) {
    return user;
  }
  return null;
}

export { getUserByUsername };
