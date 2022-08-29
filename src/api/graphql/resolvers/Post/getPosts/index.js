async function getPosts(parent, args, { models }, info) {
  return await models.models.Post.find({});
}

export { getPosts };
