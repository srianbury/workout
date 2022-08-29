async function getPostCreator(post, args, { models }, info) {
  return await models.models.User.findOne({ userId: post.userId }).exec();
}

export { getPostCreator };
