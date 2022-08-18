import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getUsersPosts } from "./getUsersPosts";
import { getUsersInitials } from "./getUsersInitials";
import { login } from "./login";

const userResolver = {
  Query: {
    getUsers,
    getUserByUsername,
  },
  Mutation: {
    login,
  },
  User: {
    posts: getUsersPosts,
    initials: getUsersInitials,
  },
};

export { userResolver };
