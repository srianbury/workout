async function getPostByPostId(parent, { postId }, { models }, info) {
  const post = models.mockPosts.find((post) => post.postId == postId); // loose equals here for string or int IDs
  if (post) {
    return post;
  }
  return null;
}

export { getPostByPostId };
