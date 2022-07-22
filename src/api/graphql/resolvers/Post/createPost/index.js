async function createPost(
  parent,
  { title, shortDescription, longDescription, videoUrlId },
  { models },
  info
) {
  const post = {
    postId: models.mockPosts.length + 1,
    title,
    shortDescription,
    longDescription,
    createdTs: new Date(),
    videoUrlId,
    userId: 1,
  };
  models.mockPosts.push(post);
  return post;
}

export { createPost };
