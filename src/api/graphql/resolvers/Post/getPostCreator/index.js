async function getPostCreator(post, args, context, info) {
  const { models } = context;
  return models.mockUsersDict[post.creatorId];
}

export { getPostCreator };
