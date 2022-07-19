async function getPost(parent, args, context, info) {
  const { models } = context;
  const { id } = args;
  const post = models.mockPosts.find((post) => post.id == id); // loose equals here for string or int IDs
  if (post) {
    return post;
  }
  return null;
}

export { getPost };
