import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getUsersPosts } from "./getUsersPosts";

const userResolver = {
  Query: {
    getUsers,
    getUserByUsername,
  },
  User: {
    posts: getUsersPosts,
  },
};

export { userResolver };
