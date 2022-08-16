async function getPostsByUsername(parent, { username }, { models }, info) {
  const user = models.mockUsers.find((user) => user.username === username);
  if (!user) {
    return null;
  }
  const { userId } = user;
  const posts = models.mockPosts.filter((post) => post.userId === userId); // loose equals here for string or int IDs
  return posts;
}

export { getPostsByUsername };
