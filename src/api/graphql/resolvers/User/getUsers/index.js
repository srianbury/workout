async function getUsers(parent, args, context, info) {
  const { models } = context;
  return models.mockUsers;
}

export { getUsers };
