async function getUserByUsername(parent, { username }, { models }, info) {
  const user = models.mockUsers.find((user) => user.username === username);
  if (user) {
    return user;
  }
  return null;
}

export { getUserByUsername };
