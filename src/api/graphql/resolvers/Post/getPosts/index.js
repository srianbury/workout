async function getPosts(parent, args, context, info) {
  const { models } = context;
  return models.mockPosts;
}

export { getPosts };
