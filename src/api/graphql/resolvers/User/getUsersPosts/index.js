async function getUsersPosts(user, args, { models }, info) {
  return models.mockPosts.filter((post) => post.creatorId === user.id);
}

export { getUsersPosts };
