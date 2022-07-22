import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getUsersPosts } from "./getUsersPosts";
import { getUsersInitials } from "./getUsersInitials";

const userResolver = {
  Query: {
    getUsers,
    getUserByUsername,
  },
  User: {
    posts: getUsersPosts,
    initials: getUsersInitials,
  },
};

export { userResolver };
