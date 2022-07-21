async function createPost(
  parent,
  { shortDescription, longDescription },
  { models },
  info
) {
  const post = {
    postId: models.mockPosts.length + 1,
    shortDescription,
    longDescription,
    userId: 1,
  };
  models.mockPosts.push(post);
  return post;
}

export { createPost };
