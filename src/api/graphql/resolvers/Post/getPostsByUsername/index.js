async function getPostsByUsername(parent, { username }, { models }, info) {
  const user = await models.models.User.findOne({ username }).exec();
  if (!user) {
    return null;
  }

  const posts = await models.models.Post.find({
    userId: user.userId,
  }).exec();
  return posts;
}

export { getPostsByUsername };
