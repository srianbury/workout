async function getPostCreator(post, args, { models }, info) {
  return models.mockUsersDict[post.userId];
}

export { getPostCreator };
