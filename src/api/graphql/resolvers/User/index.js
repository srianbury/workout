import { getUsers } from "./getUsers";
import { getUserByUsername } from "./getUserByUsername";
import { getUsersPosts } from "./getUsersPosts";
import { getUsersInitials } from "./getUsersInitials";
import { login } from "./login";
import { signUp } from "./signUp";
import { authenticate } from "./authenticate";
import { updateUserInfo } from "./updateUserInfo";

const userResolver = {
  Query: {
    getUsers,
    getUserByUsername,
  },
  Mutation: {
    login,
    signUp,
    authenticate,
    updateUserInfo,
  },
  User: {
    posts: getUsersPosts,
    initials: getUsersInitials,
  },
};

export { userResolver };
