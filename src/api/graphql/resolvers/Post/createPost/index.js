async function createPost(
  parent,
  { shortDescription, longDescription },
  { models },
  info
) {
  const post = {
    id: models.mockPosts.length + 1,
    shortDescription,
    longDescription,
    creatorId: 1,
  };
  models.mockPosts.push(post);
  return post;
}

export { createPost };
