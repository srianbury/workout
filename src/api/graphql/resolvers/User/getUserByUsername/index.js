async function getUserByUsername(parent, args, context, info) {
  const { models } = context;
  const { username } = args;
  const user = models.mockUsers.find((user) => user.username === username);
  if (user) {
    return user;
  }
  return null;
}

export { getUserByUsername };
