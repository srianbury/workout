import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";

const resolvers = {
  Query: {
    getUsers,
    getUserByUsername,
  },
};

export { resolvers };
