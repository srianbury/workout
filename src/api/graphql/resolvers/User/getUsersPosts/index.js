async function getUsersPosts(user, args, { models }, info) {
  return models.mockPosts.filter((post) => post.userId === user.userId);
}

export { getUsersPosts };
