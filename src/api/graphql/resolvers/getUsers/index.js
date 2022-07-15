import { mockUsers } from "../mockData";

async function getUsers(parent, args, context, info) {
  return mockUsers;
}

export { getUsers };
