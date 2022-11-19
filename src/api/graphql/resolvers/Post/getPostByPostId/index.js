async function getPostByPostId(parent, { postId }, { models }, info) {
  const post = await models.models.Post.findById(postId).exec();
  if (!post) {
    return null;
  }
  return post;
}

export { getPostByPostId };
