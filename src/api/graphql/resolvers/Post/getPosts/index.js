async function getPosts(parent, args, { models }, info) {
  return models.mockPosts;
}

export { getPosts };
